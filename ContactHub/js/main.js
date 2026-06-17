// ========================================
// 1. DOM ELEMENTS SELECTION
// ========================================

// --- Form Input Fields ---
const fullNameInputField = document.querySelector("#contactFullName");
const phoneNumberInputField = document.querySelector("#contactPhoneNumber");
const emailAddressInputField = document.querySelector("#contactEmailAddress");
const addressInputField = document.querySelector("#address");
const groupSelectorDropdown = document.querySelector("#group");
const notesTextareaField = document.querySelector("#notes");

// --- Checkbox Inputs ---
const markAsFavoriteCheckbox = document.querySelector("#favorite-checked");
const markAsEmergencyCheckbox = document.querySelector("#emergency-checked");

// --- Badge Elements (Templates) ---
const favoriteBadgeElement = document.querySelector(".favorite-badge");
const emergencyBadgeElement = document.querySelector(".emergency-badge");
// Note: workBadgeElement, familyBadgeElement etc. are used in string generation logic later.

// --- Layout & Modal Elements ---
const allContactsLayoutContainer = document.querySelector("#layout");
const addContactModalDialog = document.querySelector(".add-contact-modal");
const favoriteContactsListContainer = document.querySelector(".favorite-contacts");
const emergencyContactsListContainer = document.querySelector(".emergency-contacts");

// --- Button Elements ---
const openAddContactModalButton = document.querySelector(".btn-add-contact");
const closeModalIconButton = document.querySelector(".close-icon");
const saveNewContactButton = document.querySelector(".save-btn");
const updateExistingContactButton = document.querySelector(".update-btn"); // Not heavily used but selected
const cancelContactButton = document.querySelector(".cancel-btn");

// --- Empty State Elements ---
const totalContactsEmptyStateMessage = document.querySelector(".empty-state");
const favoriteContactsEmptyStateMessage = document.querySelector(".favorites-section .empty-message");
const emergencyContactsEmptyStateMessage = document.querySelector(".emergency-section .empty-message");

// --- Counter Display Elements ---
const totalContactsCounterDisplay = document.querySelector(".total-value");
const favoriteContactsCounterDisplay = document.querySelector(".favorite-value");
const emergencyContactsCounterDisplay = document.querySelector(".emergency-value");

// --- Alert Messages ---
const alertFullName = addContactModalDialog.querySelector("#alertFullName");
const alertPhoneNumber = addContactModalDialog.querySelector("#alertPhoneNumber");
const alertEmailAddress = addContactModalDialog.querySelector("#alertEmailAddress");

// --- Search Input ---
const searchInputField = document.querySelector(".search-input");

// ========================================
// 2. DATA STORAGE & CONSTANTS
// ========================================

const allContactsArray = [];
const favoriteContactsArray = [];
const emergencyContactsArray = [];

const ALL_CONTACTS_STORAGE_KEY = "contactsList";
const FAVORITE_CONTACTS_STORAGE_KEY = "favoriteList";
const EMERGENCY_CONTACTS_STORAGE_KEY = "emergencyList";

// ========================================
// 3. INITIALIZATION
// ========================================

// Call initialization function when DOM is fully loaded
document.addEventListener("DOMContentLoaded", initializeContactManagerApp);

/**
 * Initializes the contact manager application on page load
 */
function initializeContactManagerApp() {
  console.log("🚀 Initializing Contact Manager Application...");
  
  // Load all saved contacts from localStorage
  const savedAllContactsArray = loadAllContactsFromLocalStorage();
  const savedFavoriteContactsArray = loadFavoriteContactsFromLocalStorage();
  const savedEmergencyContactsArray = loadEmergencyContactsFromLocalStorage();

  // Process all contacts if any exist
  const hasAllContacts = savedAllContactsArray.length > 0;
  if (hasAllContacts) {
    allContactsArray.push(...savedAllContactsArray);
    updateTotalContactsCounterDisplay();
    hideEmptyStateMessageForTotalContacts();
    displayAllContactsInLayout();
  }

  // Process favorite contacts if any exist
  const hasFavoriteContacts = savedFavoriteContactsArray.length > 0;
  if (hasFavoriteContacts) {
    favoriteContactsArray.push(...savedFavoriteContactsArray);
    displayAllFavoriteContactsInSidebar();
  }

  // Process emergency contacts if any exist
  const hasEmergencyContacts = savedEmergencyContactsArray.length > 0;
  if (hasEmergencyContacts) {
    console.log("🚨 Loading emergency contacts");
    emergencyContactsArray.push(...savedEmergencyContactsArray);
    displayAllEmergencyContactsInSidebar();
  }

  console.log(`Emergency contacts count: ${emergencyContactsArray.length}`);
  console.log("✅ Contact Manager initialized successfully");
}

// ========================================
// 4. EVENT LISTENERS
// ========================================

// --- Modal Controls ---
openAddContactModalButton.addEventListener("click", function () {
  addContactModalDialog.classList.remove("d-none");
  console.log("✅ Add contact modal opened");
});

closeModalIconButton.addEventListener("click", function () {
  addContactModalDialog.classList.add("d-none");
  clearAllContactFormFields();
  console.log("✅ Add contact modal closed");
});

cancelContactButton.addEventListener("click", function () {
  addContactModalDialog.classList.add("d-none");
  console.log("✅ Add contact modal closed");
});

// --- Save Action ---
saveNewContactButton.addEventListener("click", function () {
  console.log("💾 Saving contact...");
  saveOrUpdateContact();
});

// --- Card Actions (Edit/Delete/Favorite/Emergency) - Event Delegation ---
allContactsLayoutContainer.addEventListener("click", function (clickEvent) {
  const clickedElement = clickEvent.target;

  // Edit
  const isEditButton = clickedElement.closest(".btn-edit");
  if (isEditButton) {
    console.log("✏️ Edit button clicked");
    const contactIndex = handleContactClick(clickedElement);
    if (contactIndex !== -1) {
      openEditContactModal(contactIndex);
    }
    return;
  }

  // Delete
  const isDeleteButton = clickedElement.closest(".btn-delete");
  if (isDeleteButton) {
    console.log("🗑️ Delete button clicked");
    const contactIndex = handleContactClick(clickedElement);
    if (contactIndex !== -1) {
      deleteExistingContact(contactIndex);
    }
    return;
  }

  // Favorite
  const isFavoriteButton = clickedElement.closest(".btn-favorite");
  if (isFavoriteButton) {
    console.log("⭐ Favorite button clicked");
    const contactIndex = handleContactClick(clickedElement);
    if (contactIndex !== -1) {
      toggleContactFavoriteStatus(contactIndex);
    }
    return;
  }

  // Emergency
  const isEmergencyButton = clickedElement.closest(".btn-emergency");
  if (isEmergencyButton) {
    console.log("🚨 Emergency button clicked");
    const contactIndex = handleContactClick(clickedElement);
    if (contactIndex !== -1) {
      toggleContactEmergencyStatus(contactIndex);
    }
    return;
  }
});

// --- Input Validation Listeners ---
fullNameInputField.addEventListener("input", function () {
  validateContactInputField(this, "alertFullName");
});
phoneNumberInputField.addEventListener("input", function () {
  validateContactInputField(this, "alertPhoneNumber");
});
emailAddressInputField.addEventListener("input", function () {
  validateContactInputField(this, "alertEmailAddress");
});
addressInputField.addEventListener("input", function () {
  // validateContactInputField(this, "alertMessage");
});
groupSelectorDropdown.addEventListener("input", function () {
  // validateContactInputField(this, "alertMessage");
});
notesTextareaField.addEventListener("input", function () {
  // validateContactInputField(this, "alertMessage");
});

// --- Search Listener ---
searchInputField.addEventListener("input", function () {
  console.log("🔍 Search input changed");

  // Regex patterns to detect search type
  const fullNameSearchPattern = /^[a-zA-Z][a-zA-Z0-9 ]{2,50}$/;
  const phoneNumberSearchPattern = /^(010|011|012|015)\d{8}$/;
  const emailAddressSearchPattern = /^[a-zA-Z0-9._]{2,10}\@[a-zA-Z]{5,10}\.com$/;

  const currentSearchValue = searchInputField.value.trim();

  if (fullNameSearchPattern.test(currentSearchValue)) {
    filterAndDisplayContactsByName(currentSearchValue);
  } else if (phoneNumberSearchPattern.test(currentSearchValue)) {
    filterAndDisplayContactsByPhoneNumber(currentSearchValue);
  } else if (emailAddressSearchPattern.test(currentSearchValue)) {
    filterAndDisplayContactsByEmailAddress(currentSearchValue);
  } else {
    // Default to name search
    filterAndDisplayContactsByName(currentSearchValue);
  }
});

// ========================================
// 5. CORE LOGIC (CRUD)
// ========================================

/**
 * Entry point for saving (New or Update)
 */
function saveOrUpdateContact() {
  const isEditingMode = saveNewContactButton.dataset.editingIndex !== undefined;
  if (isEditingMode) {
    const contactIndexToUpdate = parseInt(saveNewContactButton.dataset.editingIndex);
    updateExistingContact(contactIndexToUpdate);

    // Reset button state
    delete saveNewContactButton.dataset.editingIndex;
    saveNewContactButton.innerHTML = `<i class="fa-solid fa-check ms-3"></i>Save Contact`;
  } else {
    addNewContactToList();
  }
}

/**
 * Creates a new contact
 */
function addNewContactToList() {
  if (
    validateContactInputField(fullNameInputField, "alertFullName") &&
    validateContactInputField(phoneNumberInputField, "alertPhoneNumber") &&
    validateContactInputField(emailAddressInputField, "alertEmailAddress")
  ) {
    if (checkForDuplicatePhoneNumber()) {
      console.log("❌ Cannot add contact - duplicate phone number");
      return;
    }
    if (checkForDuplicateEmailAddress()) {
      console.log("❌ Cannot add contact - duplicate email address ");
      return;
    }

    // Create contact object
    console.log("test");
    const newContactObject = {
      fullName: fullNameInputField.value.trim(),
      phoneNumber: phoneNumberInputField.value.trim(),
      emailAddress: emailAddressInputField.value.trim(),
      address: addressInputField.value.trim(),
      group: groupSelectorDropdown.value,
      notes: notesTextareaField.value.trim(),
      isFavorite: markAsFavoriteCheckbox.checked ? markAsFavoriteCheckbox.value : null,
      isEmergency: markAsEmergencyCheckbox.checked ? markAsEmergencyCheckbox.value : null,
    };

    // Add and Save
    allContactsArray.push(newContactObject);
    saveAllContactsToLocalStorage();
    clearAllContactFormFields();
    addContactModalDialog.classList.add("d-none");

    // Update UI
    updateTotalContactsCounterDisplay();
    if (allContactsArray.length >= 1) {
      hideEmptyStateMessageForTotalContacts();
    }
    console.log("✅ Contact added:", newContactObject);
    console.log("📋 Total contacts:", allContactsArray.length);
    displayAllContactsInLayout();

    // Handle Special Lists
    if (newContactObject.isFavorite) {
      console.log("⭐ Adding to favorites list");
      addContactToFavoritesArray(newContactObject);
      displayAllFavoriteContactsInSidebar();
    }
    if (newContactObject.isEmergency) {
      console.log("🚨 Adding to emergency list");
      addContactToEmergencyArray(newContactObject);
      displayAllEmergencyContactsInSidebar();
    }
  }
}

/**
 * Updates an existing contact
 */
function updateExistingContact(contactIndexToUpdate) {
  if (
    validateContactInputField(fullNameInputField, "alertFullName") &&
    validateContactInputField(phoneNumberInputField, "alertPhoneNumber") &&
    validateContactInputField(emailAddressInputField, "alertEmailAddress")
  ) {
    // Check duplicates only if changed
    const enteredPhoneNumber = phoneNumberInputField.value.trim();
    const oldContactPhoneNumber = allContactsArray[contactIndexToUpdate].phoneNumber;
    if (enteredPhoneNumber !== oldContactPhoneNumber) {
      if (checkForDuplicatePhoneNumber()) {
        console.log("❌ Cannot update - duplicate phone number");
        return;
      }
    }

    const enteredEmailAddress = emailAddressInputField.value.trim();
    const oldContactEmailAddress = allContactsArray[contactIndexToUpdate].emailAddress;
    if (enteredEmailAddress !== oldContactEmailAddress) {
      if (checkForDuplicateEmailAddress()) {
        console.log("❌ Cannot update - duplicate email address");
        return;
      }
    }

    // Prepare updated object
    const updatedContactObject = {
      fullName: fullNameInputField.value.trim(),
      phoneNumber: phoneNumberInputField.value.trim(),
      emailAddress: emailAddressInputField.value.trim(),
      address: addressInputField.value.trim(),
      group: groupSelectorDropdown.value,
      notes: notesTextareaField.value.trim(),
      isFavorite: markAsFavoriteCheckbox.checked ? markAsFavoriteCheckbox.value : null,
      isEmergency: markAsEmergencyCheckbox.checked ? markAsEmergencyCheckbox.value : null,
    };

    const oldContactData = allContactsArray[contactIndexToUpdate];
    allContactsArray[contactIndexToUpdate] = updatedContactObject;

    saveAllContactsToLocalStorage();
    clearAllContactFormFields();
    addContactModalDialog.classList.add("d-none");
    displayAllContactsInLayout();

    updateSpecialListsAfterEdit(oldContactData, updatedContactObject);
    console.log("✅ Contact updated successfully:", updatedContactObject);
  }
}

/**
 * Deletes a contact
 */
function deleteExistingContact(contactIndexToDelete) {
  const shouldDelete = confirm("Are you sure you want to delete this contact?");
  if (!shouldDelete) {
    return;
  }

  const deletedContact = allContactsArray[contactIndexToDelete];
  allContactsArray.splice(contactIndexToDelete, 1);

  // Remove from special lists
  if (deletedContact.isFavorite) {
    removeContactFromFavoritesArray(deletedContact);
    saveFavoriteContactsToLocalStorage();
    updateFavoriteContactsCounterDisplay();
    displayAllFavoriteContactsInSidebar();
  }

  if (deletedContact.isEmergency) {
    removeContactFromEmergencyArray(deletedContact);
    saveEmergencyContactsToLocalStorage();
    updateEmergencyContactsCounterDisplay();
    displayAllEmergencyContactsInSidebar();
  }

  saveAllContactsToLocalStorage();
  displayAllContactsInLayout();
  updateTotalContactsCounterDisplay();

  if (allContactsArray.length === 0) {
    showEmptyStateMessageForTotalContacts();
  }

  console.log("🗑️ Contact deleted:", deletedContact);
}

/**
 * Prepares the edit modal
 */
function openEditContactModal(contactIndexToEdit) {
  const contactToEdit = allContactsArray[contactIndexToEdit];
  
  fullNameInputField.value = contactToEdit.fullName;
  phoneNumberInputField.value = contactToEdit.phoneNumber;
  emailAddressInputField.value = contactToEdit.emailAddress;
  addressInputField.value = contactToEdit.address;
  groupSelectorDropdown.value = contactToEdit.group;
  notesTextareaField.value = contactToEdit.notes;
  markAsFavoriteCheckbox.checked = contactToEdit.isFavorite ? true : false;
  markAsEmergencyCheckbox.checked = contactToEdit.isEmergency ? true : false;

  saveNewContactButton.dataset.editingIndex = contactIndexToEdit;
  saveNewContactButton.innerHTML = `<i class="fa-solid fa-pen me-2"></i>  Update Contact`;
  
  addContactModalDialog.classList.remove("d-none");
  console.log(`✏️ Editing contact at index ${contactIndexToEdit}:`, contactToEdit);
}

// ========================================
// 6. SPECIAL STATUS LOGIC (FAV/EMERGENCY)
// ========================================

/**
 * Toggles favorite status
 */
function toggleContactFavoriteStatus(contactIndex) {
  const contactToToggle = allContactsArray[contactIndex];
  const isCurrentlyFavorite = contactToToggle.isFavorite !== null && contactToToggle.isFavorite !== undefined;

  if (isCurrentlyFavorite) {
    contactToToggle.isFavorite = null;
    removeContactFromFavoritesArray(contactToToggle);
    console.log(`⭐ Removed from favorites: ${contactToToggle.fullName}`);
  } else {
    contactToToggle.isFavorite = "true";
    addContactToFavoritesArray(contactToToggle);
    console.log(`⭐ Added to favorites: ${contactToToggle.fullName}`);
  }

  saveAllContactsToLocalStorage();
  displayAllContactsInLayout();
  displayAllFavoriteContactsInSidebar();
  updateFavoriteContactsCounterDisplay();
}

/**
 * Toggles emergency status
 */
function toggleContactEmergencyStatus(contactIndex) {
  const contactToToggle = allContactsArray[contactIndex];
  const isCurrentlyEmergency = contactToToggle.isEmergency !== null && contactToToggle.isEmergency !== undefined;

  if (isCurrentlyEmergency) {
    contactToToggle.isEmergency = null;
    removeContactFromEmergencyArray(contactToToggle);
    console.log(`🚨 Removed from emergency: ${contactToToggle.fullName}`);
  } else {
    contactToToggle.isEmergency = "true";
    addContactToEmergencyArray(contactToToggle);
    console.log(`🚨 Added to emergency: ${contactToToggle.fullName}`);
  }

  saveAllContactsToLocalStorage();
  displayAllContactsInLayout();
  displayAllEmergencyContactsInSidebar();
  updateEmergencyContactsCounterDisplay();
}

function addContactToFavoritesArray(contactToAddAsFavorite) {
  favoriteContactsArray.push(contactToAddAsFavorite);
  const favoriteContactsJsonString = JSON.stringify(favoriteContactsArray);
  localStorage.setItem("favoriteList", favoriteContactsJsonString);
  console.log(`⭐ Contact added to favorites: ${contactToAddAsFavorite.fullName}`);
}

function addContactToEmergencyArray(contactToAddAsEmergency) {
  emergencyContactsArray.push(contactToAddAsEmergency);
  const emergencyContactsJsonString = JSON.stringify(emergencyContactsArray);
  localStorage.setItem("emergencyList", emergencyContactsJsonString);
  console.log(`🚨 Contact added to emergencies: ${contactToAddAsEmergency.fullName}`);
}

function removeContactFromFavoritesArray(contactToRemove) {
  const indexInFavorites = favoriteContactsArray.findIndex(
    (contact) => contact.fullName === contactToRemove.fullName
  );
  if (indexInFavorites !== -1) {
    favoriteContactsArray.splice(indexInFavorites, 1);
    saveFavoriteContactsToLocalStorage();
  }
}

function removeContactFromEmergencyArray(contactToRemove) {
  const indexInEmergency = emergencyContactsArray.findIndex(
    (contact) => contact.fullName === contactToRemove.fullName
  );
  if (indexInEmergency !== -1) {
    emergencyContactsArray.splice(indexInEmergency, 1);
    saveEmergencyContactsToLocalStorage();
  }
}

function updateSpecialListsAfterEdit(oldContactData, updatedContactData) {
  // Handle favorites
  if (oldContactData.isFavorite && !updatedContactData.isFavorite) {
    removeContactFromFavoritesArray(oldContactData);
  } else if (!oldContactData.isFavorite && updatedContactData.isFavorite) {
    addContactToFavoritesArray(updatedContactData);
  } else if (oldContactData.isFavorite && updatedContactData.isFavorite) {
    const favoriteIndex = favoriteContactsArray.findIndex(
      (contact) => contact.fullName === oldContactData.fullName
    );
    if (favoriteIndex !== -1) {
      favoriteContactsArray[favoriteIndex] = updatedContactData;
      localStorage.setItem("favoriteList", JSON.stringify(favoriteContactsArray));
    }
  }

  // Handle emergency
  if (oldContactData.isEmergency && !updatedContactData.isEmergency) {
    removeContactFromEmergencyArray(oldContactData);
  } else if (!oldContactData.isEmergency && updatedContactData.isEmergency) {
    addContactToEmergencyArray(updatedContactData);
  } else if (oldContactData.isEmergency && updatedContactData.isEmergency) {
    const emergencyIndex = emergencyContactsArray.findIndex(
      (contact) => contact.fullName === oldContactData.fullName
    );
    if (emergencyIndex !== -1) {
      emergencyContactsArray[emergencyIndex] = updatedContactData;
      localStorage.setItem("emergencyList", JSON.stringify(emergencyContactsArray));
    }
  }

  displayAllFavoriteContactsInSidebar();
  displayAllEmergencyContactsInSidebar();
}

// ========================================
// 7. UI & DISPLAY FUNCTIONS
// ========================================

/**
 * Displays all contacts in the main contacts layout
 */
function displayAllContactsInLayout() {
  let allContactCardsHtmlString = "";
  for (const singleContact of allContactsArray) {
    allContactCardsHtmlString += generateContactCardHtmlString(singleContact);
  }
  allContactsLayoutContainer.innerHTML = allContactCardsHtmlString;
  console.log(`✅ Displayed ${allContactsArray.length} contacts`);
}

/**
 * Generates HTML for a single contact card
 */
function generateContactCardHtmlString(contactObject) {
  const contactInitialsString = extractInitialsFromFullName(contactObject.fullName);
  
  const shouldShowFavoriteBadge = contactObject.isFavorite;
  const favoriteBadgeHtmlString = shouldShowFavoriteBadge
    ? `<span class="favorite-badge rounded-circle border border-white border-2 w-20 h-20 center position-absolute end-0 top-0">
         <i class="fa-solid fa-star text-white fs-8 lh-sm"></i>
       </span>`
    : "";

  const shouldShowEmergencyBadge = contactObject.isEmergency;
  const emergencyBadgeHtmlString = shouldShowEmergencyBadge
    ? `<span class="emergency-badge rounded-circle border border-white border-2 bg-danger w-20 h-20 center position-absolute end-0 bottom-0">
         <i class="fa-solid fa-heart-pulse text-white fs-8 lh-sm"></i>
       </span>`
    : "";

  const favoriteButtonActiveClass = contactObject.isFavorite ? "favorite-on" : "";
  const emergencyButtonActiveClass = contactObject.isEmergency ? "emergency-on" : "";

  return `
    <div class="col">
      <div class="inner contact-card rounded-4 shadow-sm overflow-hidden">
        <div class="p-3 pb-12 bg-white">
          <div class="contact-header center justify-content-start gap-12 mb-12">
            <div class="contact-avatar w-56 h-56 rounded-12 bg-purple center position-relative">
              <span class="contact-initials text-white text-uppercase fw-semibold fs-18">
                ${contactInitialsString}
              </span>
              ${favoriteBadgeHtmlString}
              ${emergencyBadgeHtmlString}
            </div>
            <div class="contact-main-info">
              <h3 class="contact-name fs-6 fw-semibold">${contactObject.fullName}</h3>
              <div class="contact-phone center justify-content-start gap-2">
                <span class="phone-icon w-24 h-24 center rounded-2">
                  <i class="fa-solid fa-phone fs-9"></i>
                </span>
                <span class="phone-number fs-14 text-silver">${contactObject.phoneNumber}</span>
              </div>
            </div>
          </div>
          
          <div class="contact-body">
            <div class="contact-email center justify-content-start gap-2 mb-12">
              <span class="email-icon w-28 h-28 center rounded-2">
                <i class="fa-solid fa-envelope fs-9"></i>
              </span>
              <span class="email fs-14 text-gray">${contactObject.emailAddress}</span>
            </div>
            
            <div class="contact-location center justify-content-start gap-2 mb-12">
              <span class="location-icon w-28 h-28 center rounded-2 p-2">
                <i class="fa-solid fa-location-dot fs-9"></i>
              </span>
              <span class="location-number fs-14 text-gray">${contactObject.address}</span>
            </div>
            
            <div class="contact-group">
              ${generateGroupBadgeHtmlString(contactObject.group)}
              ${contactObject.isEmergency ? generateEmergencyBadgeHtmlString() : ""}
            </div>
          </div>
        </div>
        
        <div class="contact-footer contact-actions border-top px-3 py-12 center justify-content-between">
          <div class="primary-actions center gap-6">
            <button class="btn btn-call w-36 h-36 center rounded-3">
              <a href="tel:${contactObject.phoneNumber}">
                <i class="phone-icon fa-solid fa-phone fs-14"></i>
              </a>
            </button>
            <button class="btn btn-email w-36 h-36 center rounded-3">
              <a href="mailto:${contactObject.emailAddress}">
                <i class="email-icon fa-solid fa-envelope fs-14"></i>
              </a>
            </button>
          </div>
          <div class="secondary-actions center gap-6">
            <button class="btn btn-favorite w-36 h-36 center rounded-3 ${favoriteButtonActiveClass}">
              <i class="favorite-icon fa-solid fa-star fs-14 text-silver"></i>
            </button>
            <button class="btn btn-emergency w-36 h-36 center rounded-3 ${emergencyButtonActiveClass}">
              <i class="emergency-icon fa-solid fa-heart-pulse fs-14 text-silver"></i>
            </button>
            <button class="btn btn-edit w-36 h-36 center rounded-3">
              <i class="edit-icon fa-solid fa-pen fs-14 text-gray"></i>
            </button>
            <button class="btn btn-delete w-36 h-36 center rounded-3">
              <i class="delete-icon fa-solid fa-trash fs-14 text-gray"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Displays favorites sidebar
 */
function displayAllFavoriteContactsInSidebar() {
  console.log("📋 Displaying favorite contacts list");
  const savedFavoriteContactsJsonString = localStorage.getItem("favoriteList");
  const parsedFavoriteContactsArray = JSON.parse(savedFavoriteContactsJsonString);

  console.log(`Found ${favoriteContactsArray.length} favorites in memory`);
  const hasFavoriteContacts = parsedFavoriteContactsArray && parsedFavoriteContactsArray.length > 0;
  
  if (!hasFavoriteContacts) {
    showEmptyStateMessageForFavoriteContacts();
    favoriteContactsListContainer.classList.add("d-none");
    return;
  }

  hideEmptyStateMessageForFavoriteContacts();
  favoriteContactsListContainer.classList.remove("d-none");
  updateFavoriteContactsCounterDisplay();

  let allFavoriteContactsHtmlString = "";
  for (const singleFavoriteContact of parsedFavoriteContactsArray) {
    console.log("🔄 Processing favorite contact");
    const favoriteContactInitialsString = extractInitialsFromFullName(singleFavoriteContact.fullName);
    allFavoriteContactsHtmlString += generateFavoriteContactItemHtmlString(
      singleFavoriteContact,
      favoriteContactInitialsString
    );
  }
  favoriteContactsListContainer.innerHTML = allFavoriteContactsHtmlString;
  console.log("✅ Favorite contacts displayed successfully");
}

/**
 * Displays emergency sidebar
 */
function displayAllEmergencyContactsInSidebar() {
  console.log("📋 Displaying emergency contacts list");
  const savedEmergencyContactsJsonString = localStorage.getItem("emergencyList");
  const parsedEmergencyContactsArray = JSON.parse(savedEmergencyContactsJsonString);

  const hasEmergencyContacts = parsedEmergencyContactsArray && parsedEmergencyContactsArray.length > 0;
  if (!hasEmergencyContacts) {
    showEmptyStateMessageForEmergencyContacts();
    emergencyContactsListContainer.classList.add("d-none");
    return;
  }

  hideEmptyStateMessageForEmergencyContacts();
  emergencyContactsListContainer.classList.remove("d-none");
  updateEmergencyContactsCounterDisplay();

  let allEmergencyContactsHtmlString = "";
  for (const singleEmergencyContact of parsedEmergencyContactsArray) {
    const emergencyContactInitialsString = extractInitialsFromFullName(singleEmergencyContact.fullName);
    allEmergencyContactsHtmlString += generateEmergencyContactItemHtmlString(
      singleEmergencyContact,
      emergencyContactInitialsString
    );
  }
  emergencyContactsListContainer.innerHTML = allEmergencyContactsHtmlString;
  console.log("✅ Emergency contacts displayed successfully");
}

function generateFavoriteContactItemHtmlString(favoriteContactObject, initialsString) {
  return `
    <div class="favorite-contact center justify-content-between p-10 rounded-12 mb-12">
      <div class="left center justify-content-between gap-12">
        <div class="contact-avatar w-40 h-40 rounded-12 bg-purple center">
          <span class="contact-initials text-white text-uppercase fw-semibold fs-14">
            ${initialsString}
          </span>
        </div>
        <div class="contact-main-info center flex-column align-items-start">
          <h4 class="contact-name fs-14 lh-base fw-medium mb-0">${favoriteContactObject.fullName}</h4>
          <span class="phone-number text-silver fs-12 lh-13">${favoriteContactObject.phoneNumber}</span>
        </div>
      </div>
      <button class="right btn btn-call w-36 h-36 center rounded-3">
        <a href="tel:${favoriteContactObject.phoneNumber}">
          <i class="phone-icon fa-solid fa-phone fs-14"></i>
        </a>
      </button>
    </div>
  `;
}

function generateEmergencyContactItemHtmlString(emergencyContactObject, initialsString) {
  return `
    <div class="emergency-contact center justify-content-between p-10 rounded-12 mb-12">
      <div class="left center justify-content-between gap-12">
        <div class="contact-avatar w-40 h-40 rounded-12 bg-purple center">
          <span class="contact-initials text-white text-uppercase fw-semibold fs-14">
            ${initialsString}
          </span>
        </div>
        <div class="contact-main-info center flex-column align-items-start">
          <h4 class="contact-name fs-14 lh-base fw-medium mb-0">${emergencyContactObject.fullName}</h4>
          <span class="phone-number text-silver fs-12 lh-13">${emergencyContactObject.phoneNumber}</span>
        </div>
      </div>
      <button class="right btn btn-call w-36 h-36 center rounded-3">
        <a href="tel:${emergencyContactObject.phoneNumber}">
          <i class="phone-icon fa-solid fa-phone fs-14"></i>
        </a>
      </button>
    </div>
  `;
}

// --- Counter Updates ---
function updateTotalContactsCounterDisplay() {
  totalContactsCounterDisplay.textContent = allContactsArray.length;
}
function updateFavoriteContactsCounterDisplay() {
  favoriteContactsCounterDisplay.textContent = favoriteContactsArray.length;
}
function updateEmergencyContactsCounterDisplay() {
  emergencyContactsCounterDisplay.textContent = emergencyContactsArray.length;
}

// --- Empty State Toggles ---
function hideEmptyStateMessageForTotalContacts() {
  totalContactsEmptyStateMessage.classList.add("d-none");
}
function showEmptyStateMessageForTotalContacts() {
  totalContactsEmptyStateMessage.classList.remove("d-none");
}
function hideEmptyStateMessageForFavoriteContacts() {
  favoriteContactsEmptyStateMessage.classList.add("d-none");
  console.log("✅ Favorite empty state hidden");
}
function showEmptyStateMessageForFavoriteContacts() {
  favoriteContactsEmptyStateMessage.classList.remove("d-none");
  console.log("✅ Favorite empty state shown");
}
function hideEmptyStateMessageForEmergencyContacts() {
  emergencyContactsEmptyStateMessage.classList.add("d-none");
  console.log("✅ Emergency empty state hidden");
}
function showEmptyStateMessageForEmergencyContacts() {
  emergencyContactsEmptyStateMessage.classList.remove("d-none");
  console.log("✅ Emergency empty state shown");
}

function clearAllContactFormFields() {
  fullNameInputField.value = "";
  phoneNumberInputField.value = "";
  emailAddressInputField.value = "";
  addressInputField.value = "";
  groupSelectorDropdown.value = "";
  notesTextareaField.value = "";
  markAsFavoriteCheckbox.checked = false;
  markAsEmergencyCheckbox.checked = false;

  fullNameInputField.classList.remove("is-valid", "is-invalid");
  phoneNumberInputField.classList.remove("is-valid", "is-invalid");
  emailAddressInputField.classList.remove("is-valid", "is-invalid");

  alertFullName.classList.add("d-none");
  alertPhoneNumber.classList.add("d-none");
  alertEmailAddress.classList.add("d-none");
}

// ========================================
// 8. LOCAL STORAGE FUNCTIONS
// ========================================

function saveAllContactsToLocalStorage() {
  const allContactsJsonString = JSON.stringify(allContactsArray);
  localStorage.setItem(ALL_CONTACTS_STORAGE_KEY, allContactsJsonString);
  console.log("💾 All contacts saved to localStorage");
}

function loadAllContactsFromLocalStorage() {
  const storedContactsJsonString = localStorage.getItem(ALL_CONTACTS_STORAGE_KEY);
  const hasStoredContacts = storedContactsJsonString !== null;
  if (hasStoredContacts) {
    const parsedContactsArray = JSON.parse(storedContactsJsonString);
    console.log(`📂 Loaded ${parsedContactsArray.length} contacts from localStorage`);
    return parsedContactsArray;
  }
  console.log("📂 No contacts found in localStorage");
  return [];
}

function loadFavoriteContactsFromLocalStorage() {
  const storedFavoriteContactsJsonString = localStorage.getItem(FAVORITE_CONTACTS_STORAGE_KEY);
  const hasStoredFavoriteContacts = storedFavoriteContactsJsonString !== null;
  if (hasStoredFavoriteContacts) {
    const parsedFavoriteContactsArray = JSON.parse(storedFavoriteContactsJsonString);
    console.log(`📂 Loaded ${parsedFavoriteContactsArray.length} favorite contacts from localStorage`);
    return parsedFavoriteContactsArray;
  }
  console.log("📂 No favorite contacts found in localStorage");
  return [];
}

function loadEmergencyContactsFromLocalStorage() {
  const storedEmergencyContactsJsonString = localStorage.getItem(EMERGENCY_CONTACTS_STORAGE_KEY);
  const hasStoredEmergencyContacts = storedEmergencyContactsJsonString !== null;
  if (hasStoredEmergencyContacts) {
    const parsedEmergencyContactsArray = JSON.parse(storedEmergencyContactsJsonString);
    console.log(`📂 Loaded ${parsedEmergencyContactsArray.length} emergency contacts from localStorage`);
    return parsedEmergencyContactsArray;
  }
  console.log("📂 No emergency contacts found in localStorage");
  return [];
}

function clearAllContactsFromLocalStorage() {
  localStorage.removeItem(ALL_CONTACTS_STORAGE_KEY);
  console.log("🗑️ All contacts cleared from localStorage");
}
function clearFavoriteContactsFromLocalStorage() {
  localStorage.removeItem(FAVORITE_CONTACTS_STORAGE_KEY);
  console.log("🗑️ Favorite contacts cleared from localStorage");
}
function clearEmergencyContactsFromLocalStorage() {
  localStorage.removeItem(EMERGENCY_CONTACTS_STORAGE_KEY);
  console.log("🗑️ Emergency contacts cleared from localStorage");
}

function saveFavoriteContactsToLocalStorage() {
  const favoriteContactsJson = JSON.stringify(favoriteContactsArray);
  localStorage.setItem("favoriteList", favoriteContactsJson);
}

function saveEmergencyContactsToLocalStorage() {
  const emergencySquadJson = JSON.stringify(emergencyContactsArray);
  localStorage.setItem("emergencyList", emergencySquadJson);
}

// ========================================
// 9. VALIDATION & UTILITY FUNCTIONS
// ========================================

function validateContactInputField(inputFieldElement, validationAlertElementId) {
  const inputValidationPatterns = {
    contactFullName: /^[a-zA-Z][a-zA-Z0-9 ]{2,50}$/,
    contactPhoneNumber: /^(010|011|012|015)\d{8}$/,
    contactEmailAddress: /^[a-zA-Z0-9._]{2,10}\@[a-zA-Z]{5,10}\.com$/,
  };
  const currentInputValue = inputFieldElement.value;
  const validationAlertElement = addContactModalDialog.querySelector(`#${validationAlertElementId}`);
  
  const validationPattern = inputValidationPatterns[inputFieldElement.id];
  const isInputValueValid = validationPattern.test(currentInputValue);
  
  if (isInputValueValid) {
    inputFieldElement.classList.add("is-valid");
    inputFieldElement.classList.remove("is-invalid");
    validationAlertElement.classList.add("d-none");
    return true;
  } else {
    inputFieldElement.classList.add("is-invalid");
    inputFieldElement.classList.remove("is-valid");
    validationAlertElement.classList.remove("d-none");
    return false;
  }
}

function checkForDuplicatePhoneNumber() {
  const enteredPhoneNumberValue = phoneNumberInputField.value.trim();
  console.log("🔍 Checking for duplicate phone number:", enteredPhoneNumberValue);
  
  for (let contactIndex = 0; contactIndex < allContactsArray.length; contactIndex++) {
    const currentContactObject = allContactsArray[contactIndex];
    const existingContactPhoneNumber = currentContactObject.phoneNumber;
    const isPhoneNumberAlreadyExists = existingContactPhoneNumber === enteredPhoneNumberValue;
    
    if (isPhoneNumberAlreadyExists) {
      alert("⚠️ This phone number already exists in your contacts!");
      console.log("❌ Duplicate phone number found");
      return true;
    }
  }
  console.log("✅ No duplicate phone number found");
  return false;
}

function checkForDuplicateEmailAddress() {
  const enteredEmailAddressValue = emailAddressInputField.value.trim();
  console.log("🔍 Checking for duplicate email address:", enteredEmailAddressValue);
  
  for (let contactIndex = 0; contactIndex < allContactsArray.length; contactIndex++) {
    const currentContactObject = allContactsArray[contactIndex];
    const existingContactEmailAddress = currentContactObject.emailAddress;
    const isEmailAddressAlreadyExists = existingContactEmailAddress === enteredEmailAddressValue;
    
    if (isEmailAddressAlreadyExists) {
      alert("⚠️ This email address already exists in your contacts!");
      console.log("❌ Duplicate email address found");
      return true;
    }
  }
  console.log("✅ No duplicate email address found");
  return false;
}

// --- Search Helpers ---

function filterAndDisplayContactsByName(searchQueryText) {
  console.log("🔍 Searching contacts by name:", searchQueryText);
  const normalizedSearchQuery = searchQueryText.toLowerCase();
  let matchingContactCardsHtmlString = "";

  for (let contactIndex = 0; contactIndex < allContactsArray.length; contactIndex++) {
    const currentContactObject = allContactsArray[contactIndex];
    const currentContactNameLowercase = currentContactObject.fullName.toLowerCase();
    const isNameMatchingSearchQuery = currentContactNameLowercase.includes(normalizedSearchQuery);
    
    if (isNameMatchingSearchQuery) {
      matchingContactCardsHtmlString += generateContactCardHtmlString(currentContactObject);
    }
  }
  allContactsLayoutContainer.innerHTML = matchingContactCardsHtmlString;
  console.log(`✅ Found ${matchingContactCardsHtmlString ? "matching" : "no"} contacts`);
}

function filterAndDisplayContactsByPhoneNumber(searchQueryText) {
  console.log("🔍 Searching contacts by phone number:", searchQueryText);
  let matchingContactCardsHtmlString = "";

  for (let contactIndex = 0; contactIndex < allContactsArray.length; contactIndex++) {
    const currentContactObject = allContactsArray[contactIndex];
    const currentContactPhoneNumber = currentContactObject.phoneNumber;
    const isPhoneNumberMatchingSearchQuery = currentContactPhoneNumber.includes(searchQueryText);
    
    if (isPhoneNumberMatchingSearchQuery) {
      matchingContactCardsHtmlString += generateContactCardHtmlString(currentContactObject);
    }
  }
  allContactsLayoutContainer.innerHTML = matchingContactCardsHtmlString;
  console.log(`✅ Found ${matchingContactCardsHtmlString ? "matching" : "no"} contacts`);
}

function filterAndDisplayContactsByEmailAddress(searchQueryText) {
  console.log("🔍 Searching contacts by email:", searchQueryText);
  const normalizedSearchQuery = searchQueryText.toLowerCase();
  let matchingContactCardsHtmlString = "";

  for (let contactIndex = 0; contactIndex < allContactsArray.length; contactIndex++) {
    const currentContactObject = allContactsArray[contactIndex];
    const currentContactEmailLowercase = currentContactObject.emailAddress.toLowerCase();
    const isEmailMatchingSearchQuery = currentContactEmailLowercase.includes(normalizedSearchQuery);
    
    if (isEmailMatchingSearchQuery) {
      matchingContactCardsHtmlString += generateContactCardHtmlString(currentContactObject);
    }
  }
  allContactsLayoutContainer.innerHTML = matchingContactCardsHtmlString;
  console.log(`✅ Found ${matchingContactCardsHtmlString ? "matching" : "no"} contacts`);
}

// --- Display Helpers ---

function extractInitialsFromFullName(personFullName) {
  const nameWordsFirstLettersArray = personFullName.match(/\b\w/g);
  const hasValidNameWords = nameWordsFirstLettersArray !== null;
  if (hasValidNameWords) {
    return nameWordsFirstLettersArray.join("").toUpperCase();
  }
  return "?";
}

function generateGroupBadgeHtmlString(contactGroupName) {
  const groupBadgeHtmlTemplates = {
    work: '<span class="work-badge rounded-6 py-1 px-2 fw-medium fs-12">Work</span>',
    family: '<span class="family-badge rounded-6 py-1 px-2 fw-medium fs-12">Family</span>',
    friends: '<span class="friends-badge rounded-6 py-1 px-2 fw-medium fs-12">Friends</span>',
    school: '<span class="school-badge rounded-6 py-1 px-2 fw-medium fs-12">School</span>',
  };
  const normalizedGroupName = contactGroupName.toLowerCase();
  return groupBadgeHtmlTemplates[normalizedGroupName] || "";
}

function generateEmergencyBadgeHtmlString() {
  return `
    <span class="emergency-badge rounded-6 py-1 px-2 fw-medium fs-12">
      <i class="emergency-icon fa-solid fa-heart-pulse fs-14 text-silver"></i>
      <span>Emergency</span>
    </span>
  `;
}

function handleContactClick(clickedContactElement) {
  const contactCardContainer = clickedContactElement.closest(".contact-card");
  const contactNameElement = contactCardContainer.querySelector(".contact-name");
  const contactFullNameText = contactNameElement.textContent;
  const contactPositionInArray = allContactsArray.findIndex(
    (contactObject) => contactObject.fullName === contactFullNameText
  );
  return contactPositionInArray;
}