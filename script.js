const themeButton = document.getElementById("theme-toggle");

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {

        themeButton.textContent = "☀️ حالت تاریک";

        localStorage.setItem("theme", "light");

    } else {

        themeButton.textContent = "🌙 حالت روشن";

        localStorage.setItem("theme", "dark");

    }

});
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    themeButton.textContent = "☀️ حالت تاریک";

}
const clearSearch = document.getElementById("clear-search");
const searchInput = document.getElementById("search-input");
const searchableCards = document.querySelectorAll(
    ".game-card, .news-card, .video-card"
);

const noResults = document.getElementById("no-results");

searchInput.addEventListener("input", function () {

    const searchText = searchInput.value.toLowerCase();

    let foundResults = false;

    searchableCards.forEach(function (card) {

        const cardText = card.textContent.toLowerCase();

        if (cardText.includes(searchText)) {

            card.style.display = "";
            foundResults = true;

        } else {

            card.style.display = "none";

        }

    });

    if (searchText !== "" && !foundResults) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }

});
clearSearch.addEventListener("click", function () {

    searchInput.value = "";

    searchInput.dispatchEvent(new Event("input"));

    searchInput.focus();

});
const statNumbers = document.querySelectorAll(".stat-number");

const statsSection = document.querySelector(".stats");

let statsStarted = false;

const statsObserver = new IntersectionObserver(function (entries) {

    if (entries[0].isIntersecting && !statsStarted) {

        statsStarted = true;

        statNumbers.forEach(function (number) {

            const target = Number(number.dataset.target);
            let current = 0;

            const counter = setInterval(function () {

                current++;

                number.textContent = current;

                if (current >= target) {
                    clearInterval(counter);
                }

            }, 100);

        });

    }

});

statsObserver.observe(statsSection);
const scrollTopButton = document.getElementById("scroll-top");

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {
        scrollTopButton.classList.add("show");
    } else {
        scrollTopButton.classList.remove("show");
    }

});

scrollTopButton.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
const feedbackName = document.getElementById("feedback-name");
const feedbackMessage = document.getElementById("feedback-message");
const feedbackSubmit = document.getElementById("feedback-submit");
const feedbackStatus = document.getElementById("feedback-status");

feedbackSubmit.addEventListener("click", function () {

    const name = feedbackName.value.trim();
    const message = feedbackMessage.value.trim();

    if (message === "") {

        feedbackStatus.textContent = "⚠️ لطفاً پیام خودتون رو بنویسید.";
        feedbackStatus.classList.add("show");

        feedbackMessage.focus();

        return;
    }

    feedbackStatus.textContent =
        `✅ ممنون ${name || "دوست گیمینگ"}! فرم شما آماده ارسال است.`;

    feedbackStatus.classList.add("show");

    feedbackName.value = "";
    feedbackMessage.value = "";

});
const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("rating-text");

stars.forEach(function (star) {

    star.addEventListener("click", function () {

        const rating = Number(star.dataset.rating);

        stars.forEach(function (item) {

            const itemRating = Number(item.dataset.rating);

            if (itemRating <= rating) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }

        });

        ratingText.textContent =
            `⭐ امتیاز شما: ${rating} از 5`;

    });

});
const feedbackCounter = document.getElementById("feedback-counter");

feedbackMessage.addEventListener("input", function () {

    const currentLength = feedbackMessage.value.length;

    feedbackCounter.textContent =
        `${currentLength} / 300`;

});
const featuredGames = [

    {
        title: "Call of Duty",
        image: "🔫",
        description: "جدیدترین اخبار، ویدیوها و مطالب مربوط به Call of Duty را اینجا دنبال کنید.",
        genre: "🎮 FPS",
        popularity: "🔥 محبوب",
        rating: "⭐ 4.8/5"
    },

    {
        title: "Minecraft",
        image: "⛏️",
        description: "ویدیوها، ساخت‌وسازها و اتفاقات جذاب دنیای Minecraft.",
        genre: "⛏️ Sandbox",
        popularity: "🔥 محبوب",
        rating: "⭐ 4.9/5"
    },

    {
        title: "GTA",
        image: "🚗",
        description: "جدیدترین مطالب و ویدیوهای مربوط به دنیای GTA.",
        genre: "🚗 Open World",
        popularity: "🔥 محبوب",
        rating: "⭐ 4.7/5"
    },

    {
        title: "Battlefield",
        image: "🎯",
        description: "اخبار و ویدیوهای هیجان‌انگیز از دنیای Battlefield.",
        genre: "🎯 FPS",
        popularity: "🔥 محبوب",
        rating: "⭐ 4.6/5"
    }

];

let featuredIndex = 0;

const featuredImage = document.getElementById("featured-image");
const featuredContent = document.querySelector(".featured-content");
const featuredTitle = document.getElementById("featured-title");
const featuredDescription = document.getElementById("featured-description");
const featuredGenre = document.getElementById("featured-genre");
const featuredPopularity = document.getElementById("featured-popularity");
const featuredRating = document.getElementById("featured-rating");
const featuredNumber = document.getElementById("featured-number");

const featuredNext = document.getElementById("featured-next");
const featuredPrev = document.getElementById("featured-prev");

function updateFeaturedGame() {

    const game = featuredGames[featuredIndex];

    featuredImage.classList.remove("change");
    featuredContent.classList.remove("change");

    void featuredImage.offsetWidth;
    void featuredContent.offsetWidth;

    featuredImage.textContent = game.image;
    featuredTitle.textContent = game.title;
    featuredDescription.textContent = game.description;
    featuredGenre.textContent = game.genre;
    featuredPopularity.textContent = game.popularity;
    featuredRating.textContent = game.rating;

    featuredNumber.textContent =
        `${featuredIndex + 1} / ${featuredGames.length}`;

    featuredImage.classList.add("change");
    featuredContent.classList.add("change");
}

featuredNext.addEventListener("click", function () {

    featuredIndex++;

    if (featuredIndex >= featuredGames.length) {
        featuredIndex = 0;
    }

    updateFeaturedGame();

});

featuredPrev.addEventListener("click", function () {

    featuredIndex--;

    if (featuredIndex < 0) {
        featuredIndex = featuredGames.length - 1;
    }

    updateFeaturedGame();

});
setInterval(function () {

    featuredIndex++;

    if (featuredIndex >= featuredGames.length) {
        featuredIndex = 0;
    }

    updateFeaturedGame();

}, 5000);
const videoFilters = document.querySelectorAll(".video-filter");
const videoCards = document.querySelectorAll(".video-card");

videoFilters.forEach(function (filter) {

    filter.addEventListener("click", function () {

        const category = filter.dataset.category;

        // Change active button
        videoFilters.forEach(function (button) {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        // Filter videos
        videoCards.forEach(function (card) {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "";

                setTimeout(function () {
                    card.classList.remove("hide");
                }, 10);

            } else {

                card.classList.add("hide");

                setTimeout(function () {
                    card.style.display = "none";
                }, 300);

            }

        });

    });

});