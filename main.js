const allStories = [
  { id: 0, author: "Luna Belle", imageUrl: "images/1.jpg" },
  { id: 1, author: "Willow Grace", imageUrl: "images/2.jpg" },
  { id: 2, author: "Emma Smith", imageUrl: "images/3.jpg" },
  { id: 3, author: "Ruby Skye", imageUrl: "images/4.jpg" },
  { id: 4, author: "Live Blogger", imageUrl: "images/5.jpg" },
  { id: 5, author: "Hazel Jade", imageUrl: "images/6.jpg" },
  { id: 6, author: "Eden Faith", imageUrl: "images/7.jpg" },
  { id: 7, author: "Emily White", imageUrl: "images/8.jpg" },
  { id: 8, author: "Amy Clark", imageUrl: "images/9.jpg" },
  { id: 9, author: "Olivia Brown", imageUrl: "images/10.jpg" },
];

let currentStory = 0;
let interval;
const duration = 5000; // 5 seconds for each story

const stories = document.querySelector(".stories");
const storiesFullView = document.querySelector(".stories-full-view");
const storyImageFull = storiesFullView.querySelector(".story img");
const storyAuthorFull = storiesFullView.querySelector(".author");
const progressBar = storiesFullView.querySelector(".progress-bar");
const closeBtn = storiesFullView.querySelector(".close-btn");
const nextBtnFull = storiesFullView.querySelector(".next-btn");
const previousBtnFull = storiesFullView.querySelector(".previous-btn");
const nextBtn = document.querySelector(".stories-container .next-btn");
const previousBtn = document.querySelector(".stories-container .previous-btn");
const storiesContent = document.querySelector(".stories-container .content");

// Add story thumbnails dynamically
allStories.forEach((story) => {
  const storyDiv = document.createElement("div");
  storyDiv.classList.add("story");
  const img = document.createElement("img");
  img.src = story.imageUrl;
  storyDiv.appendChild(img);
  const author = document.createElement("div");
  author.classList.add("author");
  author.textContent = story.author;
  storyDiv.appendChild(author);
  stories.appendChild(storyDiv);

  // Click event to open the full view
  storyDiv.addEventListener("click", () => openStory(story.id));
});

// Open story in full view
function openStory(id) {
  currentStory = id;
  updateStoryFullView();
  storiesFullView.classList.add("active");
  startProgressBar(currentStory);
}

// Close the full view
closeBtn.addEventListener("click", () => {
  storiesFullView.classList.remove("active");
  clearInterval(interval);
});

// Update full view with the current story
function updateStoryFullView() {
  const story = allStories[currentStory];
  storyImageFull.src = story.imageUrl;
  storyAuthorFull.textContent = story.author;
}

// Start progress bar for the specific story
// شروع نوار پیشرفت برای هر استوری
function startProgressBar(storyId) {
  const progressBarInner = document.createElement("div");
  progressBar.innerHTML = ""; // پاک کردن نوار قبلی
  progressBar.appendChild(progressBarInner);

  // تنظیم اندازه نوار پیشرفت به اندازه عرض عکس
  const storyImageWidth = storyImageFull.clientWidth; // گرفتن عرض فعلی تصویر
  progressBar.style.width = `${storyImageWidth}px`; // تنظیم نوار به اندازه عکس

  // شروع نوار پیشرفت
  progressBarInner.style.width = "0"; // نوار از صفر شروع می‌شود
  setTimeout(() => {
    progressBarInner.style.width = "100%"; // طی 5 ثانیه به 100% می‌رسد
  }, 100);

  // تنظیم زمان برای رفتن به استوری بعد از اتمام نوار
  clearInterval(interval); // پاک کردن تایمر قبلی
  interval = setTimeout(() => {
    nextStory();
  }, duration);
}

// تابع تعویض به داستان بعدی
function nextStory() {
  currentStory = (currentStory + 1) % allStories.length;
  updateStoryFullView();
  startProgressBar(currentStory); // شروع نوار پیشرفت برای داستان جدید
}

// تابع تعویض به داستان قبلی
function previousStory() {
  currentStory = (currentStory - 1 + allStories.length) % allStories.length;
  updateStoryFullView();
  startProgressBar(currentStory); // شروع نوار پیشرفت برای داستان جدید
}
// Event listeners for navigation buttons in full view
nextBtnFull.addEventListener("click", nextStory);
previousBtnFull.addEventListener("click", previousStory);

// Event listeners for navigation buttons in container view
nextBtn.addEventListener("click", () => {
  storiesContent.scrollLeft += 300;
});

previousBtn.addEventListener("click", () => {
  storiesContent.scrollLeft -= 300;
});

storiesContent.addEventListener("scroll", () => {
  if (storiesContent.scrollLeft <= 24) {
    previousBtn.classList.remove("active");
  } else {
    previousBtn.classList.add("active");
  }

  let maxScrollValue =
    storiesContent.scrollWidth - storiesContent.clientWidth - 24;

  if (storiesContent.scrollLeft >= maxScrollValue) {
    nextBtn.classList.remove("active");
  } else {
    nextBtn.classList.add("active");
  }
});

// Lazy-loading for infinite scroll
storiesContent.addEventListener("scroll", () => {
  if (
    storiesContent.scrollLeft + storiesContent.clientWidth >=
    storiesContent.scrollWidth - 50
  ) {
    loadMoreStories();
  }
});

// // Function to load more stories (example)
// function loadMoreStories() {
//   // Add more stories dynamically (e.g., from server or array)
//   const newStories = [
//     { id: 10, author: "New Author 1", imageUrl: "images/11.jpg" },
//     { id: 11, author: "New Author 2", imageUrl: "images/12.jpg" },
//   ];

//   newStories.forEach((story) => {
//     allStories.push(story); // Add to the global array
//     const storyDiv = document.createElement("div");
//     storyDiv.classList.add("story");
//     const img = document.createElement("img");
//     img.src = story.imageUrl;
//     storyDiv.appendChild(img);
//     const author = document.createElement("div");
//     author.classList.add("author");
//     author.textContent = story.author;
//     storyDiv.appendChild(author);
//     stories.appendChild(storyDiv);

//     // Click event to open the full view
//     storyDiv.addEventListener("click", () => openStory(story.id));
//   });
// }
