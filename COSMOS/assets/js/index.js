// WRITE YOUR JS CODE HERE

const apodContainerElement = document.getElementById("today-in-space"); // مكان عرض صورة اليوم
const launchesContainerElement = document.getElementById("launches"); // مكان عرض صورة اليوم
const planetsContainerElement = document.getElementById("planets"); // مكان عرض صورة اليوم
const navLinks = document.querySelector(".nav-links");

const navTodayInSpaceItem = navLinks.children[0]; // Today in Space
const navLaunchesItem = navLinks.children[1]; // Launches
const navPlanetsItem = navLinks.children[2]; // Planets

let launchesArray = [];

const apodApiUrl =
  "https://api.nasa.gov/planetary/apod?api_key=Tz67hNMz2kWzRjObJxfkvJqXFFKv0Sk4VhVEuGZE";

async function fetchApod() {
  try {
    showApodLoading();
    const response = await fetch(apodApiUrl);
    if (response.ok) {
      const apodData = await response.json();
      // console.log(apodData);
      renderApodContent(apodData);
    } else {
      renderApodNotFound(selectedDate);
      console.error("APOD API error: " + response.status);
    }
  } catch (error) {
    console.error("Network error: " + error.message);
  }
}

// Fetch Astronomy Picture of the Day by specific date
async function fetchApodByDate(selectedDate) {
  const apodApiUrl = `https://api.nasa.gov/planetary/apod?api_key=Tz67hNMz2kWzRjObJxfkvJqXFFKv0Sk4VhVEuGZE&date=${selectedDate}`;
  try {
    showApodLoading(); // إظهار حالة التحميل
    const response = await fetch(apodApiUrl);
    if (response.ok) {
      const apodData = await response.json();
      console.log("APOD data for date:", selectedDate, apodData);
      renderApodContent(apodData); // عرض البيانات في الصفحة
    } else {
      renderApodNotFound(selectedDate);
      console.error("APOD API error: " + response.status);
    }
  } catch (error) {
    console.error("Network error: " + error.message);
  }
}

(async () => {
  await fetchApod();
})();

apodContainerElement.addEventListener("click", (eventClick) => {
  const loadButton = eventClick.target.closest("#load-date-btn");
  const todayButton = eventClick.target.closest("#today-apod-btn");
  if (todayButton) {
    fetchApod();
  }
  if (loadButton) {
    console.log("tested");
    const apodDateInputElement = document.getElementById("apod-date-input");
    fetchApodByDate(apodDateInputElement.value);
  }
});

apodContainerElement.addEventListener("input", (eventClick) => {
  if (eventClick.target.id === "apod-date-input") {
    console.log("tested");
    updateApodDateLabel(eventClick.target);
  }
});

// عرض بيانات APOD في العنصر الرئيسي
function renderApodContent(apodData) {
  apodContainerElement.innerHTML = buildApodHtml(apodData);

  // console.log(apodDateInputElement.value);
}

// بناء الـ HTML الخاص بعرض بيانات APOD
function buildApodHtml(apodData) {
  return ` <div class="max-w-7xl mx-auto">
  <!-- Header -->
  <div
    class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
  >
    <div>
      <h2 class="text-xl md:text-2xl font-space font-bold mb-1">
        Today in Space
      </h2>
      <p id="apod-date" class="text-slate-400 text-xs md:text-sm">
        Astronomy Picture of the Day -${formatDateLong(apodData.date)}
      </p>
    </div>
    <div class="flex items-center space-x-2 md:space-x-3">
      <label for="apod-date-input" class="date-input-wrapper">
        <input
          type="date"
          id="apod-date-input"
          class="custom-date-input"
          value="${apodData.date}"
          max=""
          min="1995-06-16"
        />
        <span class="text-sm"> ${formatDateShort(apodData.date)}</span>
      </label>
      <button
        id="load-date-btn"
        class="px-3 md:px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm flex items-center space-x-1 md:space-x-2"
      >
        <i class="fas fa-search"></i> <span class="hidden sm:inline">Load</span>
      </button>
      <button
        id="today-apod-btn"
        class="px-3 md:px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors font-semibold text-sm"
      >
        Today
      </button>
    </div>
  </div>
  <!-- Main content -->
  <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
    <div class="xl:col-span-2">
      <div
        id="apod-image-container"
        class="relative rounded-2xl overflow-hidden group h-[300px] md:h-[400px] lg:h-[600px] bg-slate-800/50 flex items-center justify-center"
      >
        <div id="apod-loading" class="text-center hidden">
          <i class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"></i>
          <p class="text-slate-400">Loading today's image...</p>
        </div>
        <img
          id="apod-image"
          class="w-full h-full object-cover"
          src="${apodData.url}"
          alt="Astronomy Picture of the Day"
        />
        <div
          class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div class="absolute bottom-6 left-6 right-6">
            <button
              class="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              <i class="fas fa-expand mr-2"></i>View Full Resolution
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Side details -->
    <div class="space-y-4 md:space-y-6">
      <div
        class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6"
      >
        <h3
          id="apod-title"
          class="text-lg md:text-2xl font-semibold mb-3 md:mb-4"
        >
 
          ${apodData.title}
        </h3>
        <div class="flex items-center space-x-4 mb-4 text-sm text-slate-400">
          <span id="apod-date-detail"
            ><i class="far fa-calendar mr-2"></i>${formatDateLong(
              apodData.date
            )}</span
          >
        </div>
        <p id="apod-explanation" class="text-slate-300 leading-relaxed mb-4">
          ${apodData.explanation}
        </p>
        <div id="apod-copyright" class="text-xs text-slate-400 italic mb-4">
            &copy; Copyright: ${apodData.copyright}
        </div>
      </div>
      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h4 class="font-semibold mb-3 flex items-center">
          <i class="fas fa-info-circle text-blue-400 mr-2"></i> Image Details
        </h4>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-slate-400">Date</span>
            <span id="apod-date-info" class="font-medium"
              >${formatDateLong(apodData.date)}</span
            >
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">Media Type</span>
            <span id="apod-media-type" class="font-medium"
              >${apodData.media_type}</span
            >
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">Source</span>
            <span class="font-medium">NASA APOD</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
}

// تنسيق التاريخ بشكل كامل (December 30, 2025)
function formatDateLong(date) {
  const [year, month, day] = date.split("-");
  let monthName;
  switch (month) {
    case "1":
    case "01":
      monthName = "January";
      break;
    case "2":
    case "02":
      monthName = "February";
      break;
    case "3":
    case "03":
      monthName = "March";
      break;
    case "4":
    case "04":
      monthName = "April";
      break;
    case "5":
    case "05":
      monthName = "May";
      break;
    case "6":
    case "06":
      monthName = "June";
      break;
    case "7":
    case "07":
      monthName = "July";
      break;
    case "8":
    case "08":
      monthName = "August";
      break;
    case "9":
    case "09":
      monthName = "September";
      break;
    case "10":
      monthName = "October";
      break;
    case "11":
      monthName = "November";
      break;
    case "12":
      monthName = "December";
      break;
    default:
      monthName = "";
  }
  return `${monthName} ${day}, ${year}`;
}
// تنسيق التاريخ بشكل مختصر (Dec 30, 2025)
function formatDateShort(date) {
  const [year, month, day] = date.split("-");
  let monthName;
  switch (month) {
    case "1":
    case "01":
      monthName = "Jan";
      break;
    case "2":
    case "02":
      monthName = "Feb";
      break;
    case "3":
    case "03":
      monthName = "Mar";
      break;
    case "4":
    case "04":
      monthName = "Apr";
      break;
    case "5":
    case "05":
      monthName = "May";
      break;
    case "6":
    case "06":
      monthName = "Jun";
      break;
    case "7":
    case "07":
      monthName = "Jul";
      break;
    case "8":
    case "08":
      monthName = "Aug";
      break;
    case "9":
    case "09":
      monthName = "Sep";
      break;
    case "10":
      monthName = "Oct";
      break;
    case "11":
      monthName = "Nov";
      break;
    case "12":
      monthName = "Dec";
      break;
    default:
      monthName = "";
  }
  return `${monthName} ${day}, ${year}`;
}

function showApodLoading() {
  apodContainerElement.innerHTML = `
    <div class="max-w-7xl mx-auto">
      
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 class="text-xl md:text-2xl font-space font-bold mb-1">
            Today in Space
          </h2>
          <p id="apod-date" class="text-slate-400 text-xs md:text-sm">
            Astronomy Picture of the Day -
            <span class="text-slate-400">Loading...</span>
          </p>
        </div>
        
        <div class="flex items-center space-x-2 md:space-x-3">
          <label for="apod-date-input" class="date-input-wrapper">
            <input
              type="date"
              id="apod-date-input"
              class="custom-date-input"
              value="2024-03-14"
              max=""
              min="1995-06-16"
            />
            <span class="text-sm">Loading...</span>
          </label>
          
          <button
            id="load-date-btn"
            class="px-3 md:px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm flex items-center space-x-1 md:space-x-2"
          >
            <i class="fas fa-search"></i>
            <span class="hidden sm:inline">Load</span>
          </button>
          
          <button
            id="today-apod-btn"
            class="px-3 md:px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors font-semibold text-sm"
          >
            Today
          </button>
        </div>
      </div>
      
      <!-- Main content -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        
        <!-- Image container -->
        <div class="xl:col-span-2">
          <div
            id="apod-image-container"
            class="relative rounded-2xl overflow-hidden group h-[300px] md:h-[400px] lg:h-[600px] bg-slate-800/50 flex items-center justify-center"
          >
            <div id="apod-loading" class="text-center">
              <i class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"></i>
              <p class="text-slate-400">Loading today's image...</p>
            </div>
            
            <!-- Placeholder image (optional) -->
            <!--
            <img
              id="apod-image"
              class="w-full h-full object-cover"
              src="./assets/images/placeholder.webp"
              alt="Astronomy Picture of the Day"
            />
            -->
            
            <div class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="absolute bottom-6 left-6 right-6">
                <button
                  class="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  <i class="fas fa-expand mr-2"></i>View Full Resolution
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Side details -->
        <div class="space-y-4 md:space-y-6">
          
          <!-- Info card -->
          <div class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6">
            <h3 id="apod-title" class="text-lg md:text-2xl font-semibold mb-3 md:mb-4">
              <span class="text-lg md:text-2xl">Loading...</span>
            </h3>
            
            <div class="flex items-center space-x-4 mb-4 text-sm text-slate-400">
              <span id="apod-date-detail">
                <i class="far fa-calendar mr-2"></i>
                <span>Loading...</span>
              </span>
            </div>
            
            <p id="apod-explanation" class="text-slate-300 leading-relaxed mb-4">
              <span>Loading description...</span>
            </p>
            
            <div id="apod-copyright" class="text-xs text-slate-400 italic mb-4">
              <span>Loading...</span>
            </div>
          </div>
          
          <!-- Details card -->
          <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h4 class="font-semibold mb-3 flex items-center">
              <i class="fas fa-info-circle text-blue-400 mr-2"></i>
              Image Details
            </h4>
            
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-slate-400">Date</span>
                <span id="apod-date-info" class="font-medium">Loading...</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-slate-400">Media Type</span>
                <span id="apod-media-type" class="font-medium">Loading...</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-slate-400">Source</span>
                <span class="font-medium">NASA APOD</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  `;
}

function updateApodDateLabel(apodDateInputElement) {
  const selectedDateValue = apodDateInputElement.value;

  const formattedDateLabel = formatDateShort(selectedDateValue);
  const apodDateLabelElement = apodDateInputElement.nextElementSibling;
  // console.log(apodDateLabelElement);

  apodDateLabelElement.textContent = formattedDateLabel;
  // console.log(formattedDateLabel);
}

function renderApodNotFound(selectedDate) {
  apodContainerElement.innerHTML = `
    <div class="max-w-7xl mx-auto">
      
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 class="text-xl md:text-2xl font-space font-bold mb-1">
            Today in Space
          </h2>
          <p class="text-slate-400 text-xs md:text-sm">
            Astronomy Picture of the Day -
            <span class="">${formatDateLong(selectedDate)}</span>
          </p>
        </div>
        
        <div class="flex items-center space-x-2 md:space-x-3">
          <label for="apod-date-input" class="date-input-wrapper">
            <input
              type="date"
              id="apod-date-input"
              class="custom-date-input"
              value="${selectedDate}"
              max=""
              min="1995-06-16"
            />
            <span class="text-sm">${formatDateShort(selectedDate)}</span>
          </label>
          
          <button id="load-date-btn" class="px-3 md:px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm flex items-center space-x-1 md:space-x-2">
            <i class="fas fa-search"></i>
            <span class="hidden sm:inline">Load</span>
          </button>
          
          <button id="today-apod-btn" class="px-3 md:px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors font-semibold text-sm">
            Today
          </button>
        </div>
      </div>
      
      <!-- Main content -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        
        <!-- Image container -->
        <div class="xl:col-span-2">
          <div class="relative rounded-2xl overflow-hidden group h-[300px] md:h-[400px] lg:h-[600px] bg-slate-800/50 flex items-center justify-center">
            <div class="text-center">
              <i class="fa-solid fa-triangle-exclamation text-yellow-400 text-4xl mb-4"></i>
              <p class="text-slate-400">Failed to load image for ${formatDateLong(
                selectedDate
              )}</p>
            </div>
          </div>
        </div>
        
        <!-- Side details -->
        <div class="space-y-4 md:space-y-6">
          <div class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6">
            <h3 class="text-lg md:text-2xl font-semibold mb-3 md:mb-4">
              No APOD Available
            </h3>
            <p class="text-slate-300 leading-relaxed mb-4">
              The Astronomy Picture of the Day could not be loaded for the selected date.
            </p>
          </div>
          
          <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <h4 class="font-semibold mb-3 flex items-center">
              <i class="fas fa-info-circle text-blue-400 mr-2"></i>
              Image Details
            </h4>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-slate-400">Date</span>
                <span class="font-medium">${formatDateLong(selectedDate)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Media Type</span>
                <span class="font-medium">Unavailable</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-400">Source</span>
                <span class="font-medium">NASA APOD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

//=================================================
navTodayInSpaceItem.addEventListener("click", () => {
  console.log("tested!");
  (async () => {
    await fetchApod();
  })();

  apodContainerElement.classList.remove("hidden");
  hideLaunchesSection();
  hidePlanetsSection();

  clearNavLaunchesItemFocus();
  clearNavPlanetsItemFocus();
  navTodayInSpaceItem.classList.remove("text-slate-300");
  navTodayInSpaceItem.classList.add("bg-blue-500/10");
  navTodayInSpaceItem.classList.add("text-blue-400");
});

const loading = document.querySelectorAll("#loading");
navLaunchesItem.addEventListener("click", () => {
  console.log("tested!");
  launchesContainerElement.classList.remove("hidden");

  (async () => {
    await getUpcomingLaunches();
  })();

  hideTodayInSpaceSection();
  hidePlanetsSection();

  clearNavTodayInSpaceItemFocus();
  clearNavPlanetsItemFocus();
  navLaunchesItem.classList.remove("text-slate-300");
  navLaunchesItem.classList.add("bg-blue-500/10");
  navLaunchesItem.classList.add("text-blue-400");
});

navPlanetsItem.addEventListener("click", () => {
  console.log("tested!");
  planetsContainerElement.classList.remove("hidden");

  (async () => {
    await getAllPlanets();
  })();

  hideTodayInSpaceSection();
  hideLaunchesSection();

  clearNavTodayInSpaceItemFocus();
  clearNavLaunchesItemFocus();
  navPlanetsItem.classList.remove("text-slate-300");
  navPlanetsItem.classList.add("bg-blue-500/10");
  navPlanetsItem.classList.add("text-blue-400");
});

function hideTodayInSpaceSection() {
  apodContainerElement.classList.add("hidden");
}
function hideLaunchesSection() {
  launchesContainerElement.classList.add("hidden");
}
function hidePlanetsSection() {
  planetsContainerElement.classList.add("hidden");
}

function clearNavTodayInSpaceItemFocus() {
  navTodayInSpaceItem.classList.remove("bg-blue-500/10");
  navTodayInSpaceItem.classList.remove("text-blue-400");
  navTodayInSpaceItem.classList.add("text-slate-300");
}
function clearNavLaunchesItemFocus() {
  navLaunchesItem.classList.remove("bg-blue-500/10");
  navLaunchesItem.classList.remove("text-blue-400");
  navLaunchesItem.classList.add("text-slate-300");
}

function clearNavPlanetsItemFocus() {
  navPlanetsItem.classList.remove("bg-blue-500/10");
  navPlanetsItem.classList.remove("text-blue-400");
  navPlanetsItem.classList.add("text-slate-300");
}

async function getUpcomingLaunches(limit) {
  try {
    loading[0].classList.remove("hidden");
    loading[1].classList.remove("hidden");
    const response = await fetch(
      `https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10`
    );

    // `https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=${limit}`

    if (response.ok) {
      const data = await response.json();
      // console.log(data.results);
      // console.log(data.results[0]);
      launchesArray = data.results;
      console.log(launchesArray);
      loading[0].classList.add("hidden");
      loading[1].classList.add("hidden");
      renderLaunchesSection(data.results);
    } else {
      console.error("APOD API error: " + response.status);
    }
  } catch (error) {
    console.error("Network error: " + error.message);
  }
}

const featuredLaunchContainer = document.getElementById("featured-launch");
const launchesGridContainer = document.getElementById("launches-grid");

function renderLaunchesSection(launches) {
  buildLaunchesSectionhtml(launches);
}

function buildLaunchesSectionhtml(launches) {
  const randomIndex = Math.floor(Math.random() * launches.length);

  featuredLaunchContainer.innerHTML = buildSelecdtedLaunchHtml(
    launches[randomIndex]
  );
  launchesGridContainer.innerHTML = buildAllupcomingLauchesHtml(launches);
}

function buildSelecdtedLaunchHtml(launchObj) {
  return `
    <!-- STATIC FEATURED LAUNCH -->
            <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                       ${launchObj.status.name}
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                      ${launchObj.status.abbrev}
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${launchObj.name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span> ${launchObj.launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span> ${launchObj.rocket.configuration.name}</span>
                      </div>
                    </div>
                    <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400"> ${calculateDaysUntilLaunch(
                          launchObj.net
                        )}</p>
                        <p class="text-xs text-slate-400">
                         Days Until Launch</p>
                      </div>
                    </div>
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                           Launch Date
                        </p>
                        <p class="font-semibold"> ${formatLaunchDate(
                          launchObj.net
                        )}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                            Launch Time
                        </p>
                        <p class="font-semibold"> ${formatLaunchTime(
                          launchObj.net
                        )}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm"> ${
                          launchObj.pad.location.name
                        }</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold"> ${
                          launchObj.pad.location.country.name
                        }</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                       ${launchObj.mission.description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                   <img src="${
                     launchObj.image.image_url
                   }" alt="" class="w-full h-full object-cover">
                    <div
                      class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >
                      <i class="fas fa-rocket text-9xl text-slate-700/50"></i>
                    </div>
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
  `;
}

function buildAllupcomingLauchesHtml(launches) {
  let box = "";
  for (const launche of launches) {
    box += buildUpcomingLaunchHtml(launche);
    // console.log(launche);
  }
  // launchesGridContainerElement.innerHTML = box;
  return box;
}

function buildUpcomingLaunchHtml(launchObj) {
  return `
  <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
              ${
                launchObj.image.image_url
                  ? `<img src="${launchObj.image.image_url}" alt="" class="w-full h-full object-cover">`
                  : `<i class="fa-solid fa-shuttle-space text-5xl text-slate-700"></i>`
              }
                <!-- <i class="fas fa-space-shuttle text-5xl text-slate-700"></i> -->
               <!--   <img src="${
                 launchObj.image.image_url
               }" alt="" class="w-full h-full object-cover">  -->
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${launchObj.status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="launch-name font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                       ${launchObj.name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${launchObj.rocket.configuration.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formatLaunchDateShort(
                      launchObj.net
                    )}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formatLaunchTime(
                      launchObj.net
                    )}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${
                      launchObj.rocket.configuration.name
                    }</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1"> ${
                      launchObj.pad.location.name
                    }</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
  `;
}

function renderSelectedLauch(launchObj) {
  featuredLaunchContainer.innerHTML = buildSelecdtedLaunchHtml(launchObj);
}

launchesGridContainer.addEventListener("click", (clickEvent) => {
  const cardElement = clickEvent.target.closest(".group");
  if (cardElement) {
    const launchNameElement = cardElement.querySelector(".launch-name");
    // console.log(launchNameElement.textContent.trim());
    const launchName = launchNameElement.textContent.trim();
    const matchedLaunch = launchesArray.find(
      (launch) => launch.name === launchName
    );
    // console.log(matchedLaunch);
    renderSelectedLauch(matchedLaunch);
  }
});

function formatLaunchDate(net) {
  // حول النص لـ Date object
  const dateObj = new Date(net);

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const yearMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDayName = weekDays[dateObj.getUTCDay()];
  const monthName = yearMonths[dateObj.getUTCMonth()];
  const yearValue = dateObj.getUTCFullYear();
  const dayOfMonth = dateObj.getUTCDate();

  return `${weekDayName}, ${monthName} ${dayOfMonth}, ${yearValue}`;
}

function formatLaunchDateShort(net) {
  // حول النص لـ Date object
  const dateObj = new Date(net);

  const yearMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthName = yearMonths[dateObj.getUTCMonth()];
  const yearValue = dateObj.getUTCFullYear();
  const dayOfMonth = dateObj.getUTCDate();

  return `${monthName} ${dayOfMonth}, ${yearValue}`;
}
function formatLaunchTime(net) {
  const dateObj = new Date(net);

  const hours = dateObj.getUTCHours().toString().padStart(2, "0");
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes} ${hours < 12 ? "AM" : "PM"} UTC`;
}

function calculateDaysUntilLaunch(launchDateString) {
  const launchDate = new Date(launchDateString); // تاريخ الإطلاق
  const currentDate = new Date(); // التاريخ الحالي

  const timeDifferenceInMs = launchDate.getTime() - currentDate.getTime();
  const daysDifference = Math.floor(timeDifferenceInMs / (1000 * 60 * 60 * 24));

  const daysUntilLaunch = Math.abs(daysDifference); // تحويل الفرق لموجب
  return `${daysUntilLaunch}`;
}

// =============================================== //
let planetsArray = [];
async function getAllPlanets() {
  try {
    loading[2].classList.remove("hidden");
    const url = "https://solar-system-opendata-proxy.vercel.app/api/planets";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      // console.log(data.bodies);
      loading[2].classList.add("hidden");

      planetsArray = data.bodies;
      renderEarthPlanet();
    } else {
      console.log("Error " + response.status);
    }
  } catch (error) {
    console.log("Error " + error.message);
  }
}

const planetGridContainerElement = document.querySelector(".grid-planet");

function renderPlanetCard(planet) {
  planetGridContainerElement.innerHTML = generatePlanetCardHtml(planet);
}

function generatePlanetCardHtml(planetObj) {
  return `
    <!-- Main Planet Card -->
    <div class="xl:col-span-2 bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8">
      <!-- Planet Header Section -->
      <div class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0">
        <!-- Planet Image -->
        <div class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6">
          <img
            id="planet-detail-image"
            class="w-full h-full object-contain"
            src="${planetObj.image}"
            alt="${planetObj.name} planet detailed realistic render"
          />
        </div>

        <!-- Planet Info -->
        <div class="flex-1">
          <div class="flex items-center justify-between mb-3 md:mb-4">
            <h3 id="planet-detail-name" class="text-2xl md:text-3xl font-space font-bold">
              ${planetObj.englishName}
            </h3>
            <button class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors">
              <i class="far fa-heart"></i>
            </button>
          </div>
          <p id="planet-detail-description" class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
            ${planetObj.description}
          </p>
        </div>
      </div>

      <!-- Planet Stats Grid -->
      <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
        <!-- Semimajor Axis -->
        <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
            <i class="fas fa-ruler text-xs"></i>
            <span class="text-xs">Semimajor Axis</span>
          </p>
          <p id="planet-distance" class="text-sm md:text-lg font-semibold">
            ${(planetObj.semimajorAxis / 10 ** 6).toFixed(1)}M km
          </p>
        </div>

        <!-- Mean Radius -->
        <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
            <i class="fas fa-circle"></i>
            Mean Radius
          </p>
          <p id="planet-radius" class="text-sm md:text-lg font-semibold">
            ${planetObj.meanRadius.toFixed(0)} km
          </p>
        </div>

        <!-- Mass -->
        <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
            <i class="fas fa-weight"></i>
            Mass
          </p>
          <p id="planet-mass" class="text-sm md:text-lg font-semibold">
            ${planetObj.mass.massValue} × 10<sup>${
    planetObj.mass.massExponent
  }</sup> kg
          </p>
        </div>

        <!-- Density -->
        <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
            <i class="fas fa-compress"></i>
            Density
          </p>
          <p id="planet-density" class="text-sm md:text-lg font-semibold">
            ${planetObj.density.toFixed(2)} g/cm³
          </p>
        </div>

        <!-- Orbital Period -->
        <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
            <i class="fas fa-sync-alt"></i>
            Orbital Period
          </p>
          <p id="planet-orbital-period" class="text-sm md:text-lg font-semibold">
            ${planetObj.sideralOrbit} days
          </p>
        </div>

        <!-- Rotation Period -->
        <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
            <i class="fas fa-redo"></i>
            Rotation Period
          </p>
          <p id="planet-rotation" class="text-sm md:text-lg font-semibold">
            ${planetObj.sideralRotation.toFixed(2)} hours
          </p>
        </div>

        <!-- Moons -->
        <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
            <i class="fas fa-moon"></i>
            Moons
          </p>
          <p id="planet-moons" class="text-sm md:text-lg font-semibold">
            ${planetObj.moons ? planetObj.moons.length : "Not"}
          </p>
        </div>

        <!-- Gravity -->
        <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
          <p class="text-xs text-slate-400 mb-1 flex items-center gap-1">
            <i class="fas fa-arrows-alt-v"></i>
            Gravity
          </p>
          <p id="planet-gravity" class="text-sm md:text-lg font-semibold">
            ${planetObj.gravity.toFixed(2)} m/s²
          </p>
        </div>
      </div>
    </div>

    <!-- Sidebar Section -->
    <div class="space-y-6">
      <!-- Discovery Info Card -->
      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h4 class="font-semibold mb-4 flex items-center">
          <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
          Discovery Info
        </h4>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between items-center py-2 border-b border-slate-700">
            <span class="text-slate-400">Discovered By</span>
            <span id="planet-discoverer" class="font-semibold text-right">
              ${
                planetObj.discoveredBy
                  ? planetObj.discoveredBy
                  : "Known since antiquity"
              }
            </span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-slate-700">
            <span class="text-slate-400">Discovery Date</span>
            <span id="planet-discovery-date" class="font-semibold">
              ${
                planetObj.discoveryDate
                  ? planetObj.discoveryDate
                  : "Ancient times"
              }
            </span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-slate-700">
            <span class="text-slate-400">Body Type</span>
            <span id="planet-body-type" class="font-semibold">
              ${planetObj.bodyType}
            </span>
          </div>
          <div class="flex justify-between items-center py-2">
            <span class="text-slate-400">Volume</span>
            <span id="planet-volume" class="font-semibold">
              ${planetObj.vol.volValue} × 10<sup>${
    planetObj.vol.volExponent
  }</sup> km³
            </span>
          </div>
        </div>
      </div>

      <!-- Quick Facts Card -->
      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h4 class="font-semibold mb-4 flex items-center">
          <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
          Quick Facts
        </h4>
        <ul id="planet-facts" class="space-y-3 text-sm">
          <li class="flex items-start">
            <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
            <span class="text-slate-300">
              Mass: ${planetObj.mass.massValue} × 10<sup>${
    planetObj.mass.massExponent
  }</sup> kg
            </span>
          </li>
          <li class="flex items-start">
            <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
            <span class="text-slate-300">
              Surface gravity: ${planetObj.gravity} m/s²
            </span>
          </li>
          <li class="flex items-start">
            <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
            <span class="text-slate-300">
              Density: ${planetObj.density} g/cm³
            </span>
          </li>
          <li class="flex items-start">
            <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
            <span class="text-slate-300">
              Axial tilt: ${planetObj.axialTilt}°
            </span>
          </li>
        </ul>
      </div>

      <!-- Orbital Characteristics Card -->
      <div class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
        <h4 class="font-semibold mb-4 flex items-center">
          <i class="fas fa-satellite text-blue-400 mr-2"></i>
          Orbital Characteristics
        </h4>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between items-center py-2 border-b border-slate-700">
            <span class="text-slate-400">Perihelion</span>
            <span id="planet-perihelion" class="font-semibold">
              ${(planetObj.perihelion / 10 ** 6).toFixed(1)} M km
            </span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-slate-700">
            <span class="text-slate-400">Aphelion</span>
            <span id="planet-aphelion" class="font-semibold">
              ${(planetObj.aphelion / 10 ** 6).toFixed(1)} M km
            </span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-slate-700">
            <span class="text-slate-400">Eccentricity</span>
            <span id="planet-eccentricity" class="font-semibold">
              ${planetObj.eccentricity}
            </span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-slate-700">
            <span class="text-slate-400">Inclination</span>
            <span id="planet-inclination" class="font-semibold">
              ${planetObj.inclination}
            </span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-slate-700">
            <span class="text-slate-400">Axial Tilt</span>
            <span id="planet-axial-tilt" class="font-semibold">
              ${planetObj.axialTilt.toFixed(2)}°
            </span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-slate-700">
            <span class="text-slate-400">Avg Temperature</span>
            <span id="planet-temp" class="font-semibold">
              ${planetObj.avgTemp}°C
            </span>
          </div>
          <div class="flex justify-between items-center py-2">
            <span class="text-slate-400">Escape Velocity</span>
            <span id="planet-escape" class="font-semibold">
              ${planetObj.escape / 1000} km/s
            </span>
          </div>
        </div>
      </div>

      <!-- Learn More Button -->
      <button class="w-full py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors font-semibold">
        <i class="fas fa-book mr-2"></i>
        Learn More
      </button>
    </div>
  `;
}

const planetsGridContainer = document.getElementById("planets-grid");
planetsGridContainer.addEventListener("click", (clickEvent) => {
  // console.log("Tested!");
  const planetCard = clickEvent.target.closest(".planet-card");
  // console.log(planetCard);

  if (planetCard) {
    const planetName = planetCard.querySelector("h4").textContent;

    const matchedPlanet = planetsArray.find(
      (planet) => planet.englishName === planetName
    );
    renderPlanetCard(matchedPlanet);
    // console.log(matchedPlanet);
  }
});

function renderEarthPlanet() {
  const earthPlanet = planetsArray.find(
    (planet) => planet.englishName === "Earth"
  );
  renderPlanetCard(earthPlanet);
}
