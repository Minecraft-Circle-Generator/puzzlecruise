/**
 * Example Node.js script to push URLs to Google Indexing API.
 * This should be executed in a CI/CD pipeline (e.g. GitHub Actions) after a successful Cloudflare Pages deployment.
 * 
 * Requirements:
 * 1. Google Cloud Console: Enable Web Search Indexing API.
 * 2. Create a Service Account and download the JSON key.
 * 3. Add the Service Account email as an 'Owner' in Google Search Console.
 * 4. npm install googleapis
 */

import { google } from 'googleapis';
import fs from 'fs';

// Replace with your domain
const SITE_URL = 'https://puzzlecruise.com'; 

// Usually stored in GitHub Secrets
const keyFileContent = process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON; 

async function triggerIndexing() {
    if (!keyFileContent) {
        console.warn('Skipping Indexing API: GOOGLE_SERVICE_ACCOUNT_KEY_JSON is not set.');
        return;
    }

    const credentials = JSON.parse(keyFileContent);
    const authClient = new google.auth.JWT(
        credentials.client_email,
        null,
        credentials.private_key,
        ['https://www.googleapis.com/auth/indexing'],
        null
    );

    const indexing = google.indexing({ version: 'v3', auth: authClient });

    // In a real scenario, you would parse the sitemap.xml or pass URLs as arguments
    // For now, we mock the URLs
    const today = new Date().toISOString().split('T')[0];
    const urlsToUpdate = [
        `${SITE_URL}/connections/${today}`,
        `${SITE_URL}/pips/${today}`
    ];

    for (const url of urlsToUpdate) {
        try {
            const res = await indexing.urlNotifications.publish({
                requestBody: {
                    url: url,
                    type: 'URL_UPDATED',
                },
            });
            console.log(`Successfully notified Google about: ${url}`);
        } catch (error) {
            console.error(`Failed to notify Google about: ${url}`, error.message);
        }
    }
}

triggerIndexing();
