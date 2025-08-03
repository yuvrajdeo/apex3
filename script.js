document.addEventListener('DOMContentLoaded', function() {

    // --- QUIZ FUNCTIONALITY ---
    const quizData = [
        {
            question: "What does CSS stand for?",
            options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Coded Style Structure"],
            correct: 1
        },
        {
            question: "Which JavaScript method is used to add an element to the end of an array?",
            options: ["append()", "push()", "add()", "insert()"],
            correct: 1
        },
        {
            question: "What is the correct way to create a responsive design?",
            options: ["Using fixed pixel values", "Using media queries and flexible units", "Using only JavaScript", "Using tables for layout"],
            correct: 1
        },
        {
            question: "Which HTML tag is used to define an internal style sheet?",
            options: ["<script>", "<css>", "<style>", "<link>"],
            correct: 2
        }
    ];

    let currentQuestionIndex = 0;
    let userAnswers = new Array(quizData.length).fill(null);
    let score = 0;

    const quizContentEl = document.getElementById('quiz-content');
    const scoreDisplayEl = document.getElementById('scoreDisplay');
    const quizControlsEl = document.getElementById('quizControls');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');

    /**
     * Renders the current question and its options to the DOM.
     */
    function renderQuestion() {
        if (!quizContentEl) return;
        const questionData = quizData[currentQuestionIndex];
        let optionsHtml = '';
        questionData.options.forEach((option, index) => {
            optionsHtml += `<button class="quiz-option" data-index="${index}">${option}</button>`;
        });

        quizContentEl.innerHTML = `
            <div class="question active">
                <h3>Question ${currentQuestionIndex + 1}: ${questionData.question}</h3>
                <div class="options-container">${optionsHtml}</div>
            </div>
        `;
        
        const optionsContainer = quizContentEl.querySelector('.options-container');
        if (optionsContainer) {
            optionsContainer.addEventListener('click', handleOptionClick);
        }
        
        // If the user has already answered this question, show the feedback.
        if (userAnswers[currentQuestionIndex] !== null) {
            showAnswerFeedback(optionsContainer);
        }

        updateQuizControls();
    }

    /**
     * Handles clicks on quiz options.
     * @param {Event} event - The click event.
     */
    function handleOptionClick(event) {
        if (!event.target.matches('.quiz-option')) return;
        if (userAnswers[currentQuestionIndex] !== null) return; // Already answered

        const selectedIndex = parseInt(event.target.dataset.index);
        userAnswers[currentQuestionIndex] = selectedIndex;
        showAnswerFeedback(event.currentTarget);
        updateQuizControls();
    }
    
    /**
     * Shows feedback on the selected answer (correct/incorrect).
     * @param {HTMLElement} container - The container of the quiz options.
     */
    function showAnswerFeedback(container) {
        if (!container) return;
        const questionData = quizData[currentQuestionIndex];
        const options = container.querySelectorAll('.quiz-option');
        const userAnswer = userAnswers[currentQuestionIndex];

        options.forEach((opt, index) => {
            opt.disabled = true;
            if (index === questionData.correct) {
                opt.classList.add('correct');
            } else if (index === userAnswer) {
                opt.classList.add('incorrect');
            }
        });
    }

    /**
     * Updates the state and visibility of quiz navigation buttons.
     */
    function updateQuizControls() {
        if (!prevBtn || !nextBtn || !finishBtn) return;
        prevBtn.disabled = currentQuestionIndex === 0;
        nextBtn.disabled = userAnswers[currentQuestionIndex] === null || currentQuestionIndex === quizData.length - 1;
        
        const isLastQuestionAnswered = currentQuestionIndex === quizData.length - 1 && userAnswers[currentQuestionIndex] !== null;
        finishBtn.style.display = isLastQuestionAnswered ? 'inline-block' : 'none';
        nextBtn.style.display = currentQuestionIndex === quizData.length - 1 ? 'none' : 'inline-block';
    }

    /**
     * Navigates to the previous or next question.
     * @param {number} direction - -1 for previous, 1 for next.
     */
    function changeQuestion(direction) {
        currentQuestionIndex += direction;
        renderQuestion();
    }

    /**
     * Calculates and displays the final quiz score.
     */
    function finishQuiz() {
        score = userAnswers.reduce((acc, answer, index) => {
            return answer === quizData[index].correct ? acc + 1 : acc;
        }, 0);

        let resultMessage = '';
        const percentage = (score / quizData.length) * 100;
        if (percentage === 100) resultMessage = 'Perfect! You are a web master! 🌟';
        else if (percentage >= 75) resultMessage = 'Great job! You know your stuff! 👏';
        else if (percentage >= 50) resultMessage = 'Good effort! Keep learning! 📚';
        else resultMessage = "Don't worry, practice makes perfect! 💪";

        scoreDisplayEl.innerHTML = `
            <h3>🎉 Quiz Completed!</h3>
            <p>Your Score: ${score} / ${quizData.length}</p>
            <p>${resultMessage}</p>
            <button class="btn" id="restartQuizBtn">🔄 Restart Quiz</button>
        `;
        
        if(quizContentEl) quizContentEl.style.display = 'none';
        if(quizControlsEl) quizControlsEl.style.display = 'none';
        if(scoreDisplayEl) scoreDisplayEl.style.display = 'block';

        const restartBtn = document.getElementById('restartQuizBtn');
        if (restartBtn) {
            restartBtn.addEventListener('click', restartQuiz);
        }
    }

    /**
     * Resets the quiz to its initial state.
     */
    function restartQuiz() {
        currentQuestionIndex = 0;
        userAnswers.fill(null);
        score = 0;
        if(scoreDisplayEl) scoreDisplayEl.style.display = 'none';
        if(quizContentEl) quizContentEl.style.display = 'block';
        if(quizControlsEl) quizControlsEl.style.display = 'flex';
        renderQuestion();
    }
    
    // Add event listeners for quiz buttons
    if (prevBtn) prevBtn.addEventListener('click', () => changeQuestion(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeQuestion(1));
    if (finishBtn) finishBtn.addEventListener('click', finishQuiz);
    
    // Initial quiz render
    renderQuestion();


    // --- CAROUSEL FUNCTIONALITY ---
    const slides = document.getElementById('carouselSlides');
    const carouselImages = [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDEwfHxuYXR1cmV8ZW58MHx8fHwxNzE5Mzg3NzQ2fDA&ixlib=rb-4.0.3&q=80&w=1080',
        'https://images.unsplash.com/photo-1469854523086-dd02dfcd9edc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDN8fHRyYXZlbHxlbnwwfHx8fDE3MTkzODc3ODh8MA&ixlib=rb-4.0.3&q=80&w=1080',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDh8fGZvcmlzdHxlbnwwfHx8fDE3MTkzODc4MTV8MA&ixlib=rb-4.0.3&q=80&w=1080',
        'https://images.unsplash.com/photo-1426604902122-8d7fa385e01e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTMzNXwwfDF8c2VhcmNofDE3fHxuYXR1cmV8ZW58MHx8fHwxNzE5Mzg3NzQ2fDA&ixlib=rb-4.0.3&q=80&w=1080'
    ];
    let totalSlides = carouselImages.length;

    const prevCarouselBtn = document.querySelector('.carousel-prev');
    const nextCarouselBtn = document.querySelector('.carousel-next');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    let currentSlide = 0;
    let autoSlideInterval;

    /**
     * Renders the carousel slides dynamically based on the carouselImages array.
     */
    function renderCarousel() {
        if (!slides) return;
        slides.innerHTML = ''; // Clear existing slides
        carouselImages.forEach((imageUrl, index) => {
            const slideDiv = document.createElement('div');
            slideDiv.classList.add('carousel-slide');
            slideDiv.innerHTML = `<img src="${imageUrl}" alt="Slide ${index + 1}">`;
            slides.appendChild(slideDiv);
        });
        totalSlides = carouselImages.length; // Update totalSlides after rendering

        // Re-create indicators after slides are rendered
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = ''; // Clear existing indicators
            for (let i = 0; i < totalSlides; i++) {
                const indicator = document.createElement('span');
                indicator.classList.add('indicator');
                indicator.dataset.slideTo = i;
                indicatorsContainer.appendChild(indicator);
            }
        }
        updateCarousel(); // Call updateCarousel to set initial position and active indicator
    }

    if (totalSlides > 0 && indicatorsContainer) {
        renderCarousel(); // Initial render of carousel with images
    }
    const indicators = document.querySelectorAll('.indicator'); // Re-query indicators after they are created

    /**
     * Updates the carousel's slide position and active indicator.
     */
    function updateCarousel() {
        if (slides) {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        // Re-query indicators each time to ensure they are up-to-date
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    /**
     * Moves the carousel to a new slide.
     * @param {number} direction - -1 for previous, 1 for next.
     */
    function moveSlide(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        updateCarousel();
    }

    /**
     * Resets the interval for auto-sliding.
     */
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => moveSlide(1), 5000);
    }

    if (prevCarouselBtn && nextCarouselBtn) {
        prevCarouselBtn.addEventListener('click', () => {
            moveSlide(-1);
            resetAutoSlide();
        });
        
        nextCarouselBtn.addEventListener('click', () => {
            moveSlide(1);
            resetAutoSlide();
        });
    }

    if (indicatorsContainer) {
        indicatorsContainer.addEventListener('click', (e) => {
            if(e.target.matches('.indicator')) {
                currentSlide = parseInt(e.target.dataset.slideTo);
                updateCarousel();
                resetAutoSlide();
            }
        });
    }
    
    // Initial carousel setup
    if (totalSlides > 0) {
        updateCarousel();
        resetAutoSlide();
    }


    // --- API DATA FETCHING ---
    const dataDisplay = document.getElementById('dataDisplay');
    const fetchJokeBtn = document.getElementById('fetchJokeBtn');
    const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
    const clearDataBtn = document.getElementById('clearDataBtn');
    
    const initialDataMessage = '<div class="loading-text">Click a button above to fetch data from APIs!</div>';

    /**
     * Fetches a random joke from an API and displays it.
     */
    async function fetchJoke() {
        if (!dataDisplay) return;
        dataDisplay.innerHTML = '<div class="loading-text">Fetching joke... 😄</div>';
        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            
            dataDisplay.innerHTML = `
                <div class="api-card">
                    <h3>😂 Random Joke</h3>
                    <p style="font-size: 1.1rem; margin-top: 15px;"><strong>${data.setup}</strong></p>
                    <p style="font-size: 1.1rem; line-height: 1.6; margin-top: 10px;"><em>${data.punchline}</em></p>
                    <small style="color: #666; margin-top: 15px; display: block;">Source: Official Joke API</small>
                </div>
            `;
        } catch (error) {
            console.error("Fetch joke error:", error);
            dataDisplay.innerHTML = `
                <div class="api-card" style="background: #f8d7da; border: 1px solid #f5c6cb;">
                    <h3>❌ Error</h3>
                    <p>Failed to fetch joke. The API might be down. Please try again later!</p>
                </div>
            `;
        }
    }

    /**
     * Fetches weather data for London from an API and displays it.
     */
    async function fetchWeather() {
        if (!dataDisplay) return;
        dataDisplay.innerHTML = '<div class="loading-text">Fetching weather data... 🌤️</div>';
        try {
            // Changed location to Daltonganj, Jharkhand
            const response = await fetch('https://goweather.herokuapp.com/weather/Daltonganj'); 
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            
            dataDisplay.innerHTML = `
                <div class="api-card">
                    <h3>🌤️ Weather in Daltonganj</h3>
                    <div class="weather-info">
                        <div class="weather-item">
                            <strong>🌡️ Temp</strong><br>
                            ${data.temperature || 'N/A'}
                        </div>
                        <div class="weather-item">
                            <strong>💨 Wind</strong><br>
                            ${data.wind || 'N/A'}
                        </div>
                        <div class="weather-item">
                            <strong>📝 Desc</strong><br>
                            ${data.description || 'N/A'}
                        </div>
                    </div>
                    <small style="color: #666; margin-top: 15px; display: block;">Source: GoWeather API</small>
                </div>
            `;
        } catch (error) {
            console.error("Fetch weather error:", error);
            dataDisplay.innerHTML = `
                <div class="api-card" style="background: #f8d7da; border: 1px solid #f5c6cb;">
                    <h3>❌ Error</h3>
                    <p>Failed to fetch weather data. The API might be down. Please try again later!</p>
                </div>
            `;
        }
    }

    /**
     * Clears the API data display area.
     */
    function clearData() {
        if (dataDisplay) {
            dataDisplay.innerHTML = initialDataMessage;
        }
    }

    if (fetchJokeBtn) fetchJokeBtn.addEventListener('click', fetchJoke);
    if (fetchWeatherBtn) fetchWeatherBtn.addEventListener('click', fetchWeather);
    if (clearDataBtn) clearDataBtn.addEventListener('click', clearData);
    
    // --- RESPONSIVE BOX COLOR CHANGE ---
    /**
     * Changes the background color of demo boxes based on screen width.
     */
    function updateDemoBoxColors() {
        const width = window.innerWidth;
        const demoBoxes = document.querySelectorAll('.demo-box');
        
        let colorGradient = 'linear-gradient(45deg, #1dd1a1, #5f27cd)'; // Default: Green to Purple
        if (width <= 480) {
            colorGradient = 'linear-gradient(45deg, #ff6b6b, #feca57)'; // Red to Yellow
        } else if (width <= 768) {
            colorGradient = 'linear-gradient(45deg, #48dbfb, #0abde3)'; // Blue
        }
        
        demoBoxes.forEach(box => {
            box.style.background = colorGradient;
        });
    }
    
    window.addEventListener('resize', updateDemoBoxColors);
    // Initial call to set colors on page load.
    updateDemoBoxColors();
});
