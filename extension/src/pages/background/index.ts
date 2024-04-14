import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';
import * as util from '@root/utils/utils';

reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');

const addSecretsToStorage = async secrets => {
  // Retrieve the existing keys and clear them if they exist
  const keysStr = await util.getSessionStorageItem('allKeys');
  let keys = keysStr ? JSON.parse(keysStr as string) : [];

  // Function to remove each key
  const clearStorage = async () => {
    for (const key of keys) {
      await util.deleteSessionStorageItem(key);
    }
    await util.deleteSessionStorageItem('allKeys'); // Remove the allKeys item itself
  };

  // Clear existing secrets before adding new ones
  if (keys.length > 0) {
    await clearStorage();
  }

  // Reset keys array for new insertion
  keys = [];

  // Store new secrets and their keys
  for (const secret of secrets) {
    const { domain, value } = secret;
    console.log('Adding new secret to storage:', domain, value);

    if (!keys.includes(domain)) {
      keys.push(domain);
    }

    await util.setSessionStorageItem(domain, value);
  }

  // Store the updated keys array
  await util.setSessionStorageItem('allKeys', JSON.stringify(keys));
};

const addSecretToStorage = async secret => {
  const { domain, value } = secret;
  console.log('Adding secret to storage:', domain, value);

  // Step 1: Retrieve the existing 'allKeys' from session storage
  const keysStr = await util.getSessionStorageItem('allKeys');
  let keys = keysStr ? JSON.parse(keysStr as string) : [];

  // Step 2: Add the new secret to storage
  await util.setSessionStorageItem(domain, value);

  // Step 3: Check if the domain already exists in the keys array
  if (!keys.includes(domain)) {
    keys.push(domain); // Add the new domain to the keys array if it's not already included
    await util.setSessionStorageItem('allKeys', JSON.stringify(keys)); // Update the 'allKeys' in storage
    console.log(`Added ${domain} to allKeys.`);
  }

  console.log('Sending message to app');

  chrome.runtime.sendMessage({
    action: 'secretsUpdated',
    secret: secret,
  });
};

const deleteSecretFromStorage = async domain => {
  console.log('Removing secret from storage:', domain);

  // First, delete the secret itself
  await util.deleteSessionStorageItem(domain);

  // Retrieve the current list of all keys
  const keysStr = await util.getSessionStorageItem('allKeys');
  if (keysStr) {
    let keys = JSON.parse(keysStr as string);

    // Remove the domain from the keys array
    keys = keys.filter(key => key !== domain);

    // Save the updated keys array back to session storage
    await util.setSessionStorageItem('allKeys', JSON.stringify(keys));
  }
};

const getSecretForDomain = async domain => {
  return (await util.getSessionStorageItem(domain)) || null;
};

const getAllSecrets = async () => {
  const keysStr = await util.getSessionStorageItem('allKeys');
  if (!keysStr) {
    return null;
  }
  const keys = JSON.parse((await util.getSessionStorageItem('allKeys')) as string);
  const secrets = [];
  for (const key of keys) {
    const value = await util.getSessionStorageItem(key);
    secrets.push({ domain: key, value });
  }
  return secrets;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('We received a message!');
  if (request.action == 'getSecret') {
    console.log('Getting secret for domain from storage:', request.domain);
    const domain = request.domain;
    getSecretForDomain(domain).then(secret => {
      let response;
      if (secret) {
        response = { success: true, secret: secret };
      } else {
        response = { success: false, secret: null };
      }
      sendResponse(response);
    });
    return true;
  }
  if (request.action == 'getSecretsFromMemory') {
    console.log('Getting all secrets from storage');
    getAllSecrets().then(secrets => {
      let response;
      if (secrets) {
        response = { success: true, secrets: secrets };
      } else {
        response = { success: false, secrets: null };
      }
      sendResponse(response);
    });
    return true;
  }
  if (request.action == 'addSecretsToMemory') {
    //First lets clear storage if we have it

    const secrets = request.secrets;
    addSecretsToStorage(secrets);
    sendResponse({ success: true });
    return true;
  }
  if (request.action == 'addSecretToMemory') {
    const secret = request.secret;
    addSecretToStorage(secret);
    sendResponse({ success: true });
    return true;
  }
  if (request.action == 'deleteSecretFromMemory') {
    const domain = request.domain;
    deleteSecretFromStorage(domain);
    sendResponse({ success: true });
    return true;
  }
});
