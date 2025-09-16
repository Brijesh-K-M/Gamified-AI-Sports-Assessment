// Gamified SAI Assessment Application
class GamifiedSAIApp {
    constructor() {
        this.currentScreen = 'landing-page';
        this.currentUser = null;
        this.currentTest = null;
        this.testResults = {};
        this.athletes = [];
        this.currentAthleteProfile = null;
        
        // Gamification Data
        this.levels = [
            {level: 1, name: "Beginner", minXP: 0, maxXP: 500, color: "#D9C4B0"},
            {level: 2, name: "Intermediate", minXP: 500, maxXP: 1200, color: "#CFAB8D"},
            {level: 3, name: "Advanced", minXP: 1200, maxXP: 2500, color: "#BBDCE5"},
            {level: 4, name: "Elite", minXP: 2500, maxXP: 5000, color: "#B8860B"}
        ];

        this.badges = [
            {id: "first-test", name: "First Steps", description: "Complete your first assessment test", icon: "fas fa-play-circle", points: 100},
            {id: "perfect-score", name: "Perfect Score", description: "Achieve an excellent rating", icon: "fas fa-star", points: 200},
            {id: "speed-runner", name: "Speed Demon", description: "Complete assessment in under 10 minutes", icon: "fas fa-bolt", points: 150},
            {id: "consistency-master", name: "Consistent Performer", description: "Complete all three tests", icon: "fas fa-target", points: 300},
            {id: "streak-champion", name: "Streak Master", description: "Maintain a 7-day streak", icon: "fas fa-fire", points: 250}
        ];

        this.challenges = [
            {id: "daily-test", name: "Daily Assessment", description: "Complete one test today", points: 50, type: "daily"},
            {id: "weekly-trio", name: "Triple Threat", description: "Complete all three tests this week", points: 200, type: "weekly"},
            {id: "improvement", name: "Personal Best", description: "Beat your previous score", points: 100, type: "ongoing"}
        ];

        this.pointRewards = {
            broadJump: {base: 200, excellent: 450, good: 300, average: 200, poor: 100},
            sitUps: {base: 220, excellent: 500, good: 350, average: 220, poor: 120},
            sprint30m: {base: 180, excellent: 400, good: 280, average: 180, poor: 90}
        };

        // Sample Athletes with Gamification Data
        this.sampleAthletes = [
            {
                id: 1,
                name: "Arjun Sharma",
                age: 16,
                gender: "Male",
                location: "Mumbai, Maharashtra",
                level: 3,
                points: 1450,
                xp: 1450,
                badges: ["first-test", "perfect-score", "speed-runner"],
                streak: 5,
                tests: {
                    broadJump: {distance: 245, rating: "Good", percentile: 75, points: 300},
                    sitUps: {reps: 28, rating: "Excellent", percentile: 85, points: 400},
                    sprint30m: {time: 4.2, rating: "Good", percentile: 70, points: 280}
                },
                overallScore: 77,
                dateAssessed: "2024-09-15"
            },
            {
                id: 2,
                name: "Priya Patel",
                age: 15,
                gender: "Female",
                location: "Ahmedabad, Gujarat",
                level: 4,
                points: 2100,
                xp: 2100,
                badges: ["first-test", "perfect-score", "consistency-master", "streak-champion"],
                streak: 12,
                tests: {
                    broadJump: {distance: 210, rating: "Excellent", percentile: 90, points: 450},
                    sitUps: {reps: 32, rating: "Excellent", percentile: 95, points: 500},
                    sprint30m: {time: 4.8, rating: "Good", percentile: 75, points: 320}
                },
                overallScore: 87,
                dateAssessed: "2024-09-14"
            },
            {
                id: 3,
                name: "Rajesh Kumar",
                age: 17,
                gender: "Male",
                location: "Lucknow, Uttar Pradesh",
                level: 2,
                points: 750,
                xp: 750,
                badges: ["first-test"],
                streak: 1,
                tests: {
                    broadJump: {distance: 220, rating: "Average", percentile: 50, points: 200},
                    sitUps: {reps: 22, rating: "Average", percentile: 55, points: 220},
                    sprint30m: {time: 4.5, rating: "Average", percentile: 45, points: 180}
                },
                overallScore: 50,
                dateAssessed: "2024-09-13"
            }
        ];

        this.testDescriptions = {
            broadJump: {
                name: "Standing Broad Jump",
                icon: "fas fa-running",
                description: "Measures explosive leg strength and body coordination",
                instructions: [
                    "Stand behind the marked line with feet slightly apart",
                    "Use two-foot take-off and landing",
                    "Swing arms and bend knees for forward drive",
                    "Jump as far as possible, landing on both feet",
                    "Measurement taken from take-off line to nearest landing point"
                ],
                equipment: "Measuring tape, marked starting line",
                duration: "3 attempts allowed",
                unit: "cm",
                type: "distance",
                difficulty: "Medium",
                pointReward: "200-450 XP"
            },
            sitUps: {
                name: "Sit Ups",
                icon: "fas fa-dumbbell",
                description: "Measures abdominal strength and endurance",
                instructions: [
                    "Lie on back with knees bent at less than 90 degrees",
                    "Feet flat on floor, hands clasped behind neck",
                    "Partner holds feet down for stability",
                    "Curl up touching elbows to knees",
                    "Return to starting position with elbows touching ground"
                ],
                equipment: "Exercise mat, stopwatch",
                duration: "30 seconds (U-12), 45 seconds (12+ years)",
                unit: "reps",
                type: "count",
                difficulty: "Hard",
                pointReward: "220-500 XP"
            },
            sprint30m: {
                name: "30m Sprint",
                icon: "fas fa-bolt",
                description: "Measures speed and acceleration",
                instructions: [
                    "Stand behind the starting line",
                    "On 'ready' and 'go' commands, sprint to finish line",
                    "Run through the finish line, don't slow down before",
                    "Timing starts at first movement",
                    "Only one participant runs at a time"
                ],
                equipment: "30m marked track, stopwatch, cones",
                duration: "2 attempts allowed",
                unit: "sec",
                type: "time",
                difficulty: "Easy",
                pointReward: "180-400 XP"
            }
        };

        this.benchmarks = {
            broadJump: {
                male: {"15-16": {excellent: 240, good: 220, average: 200, belowAverage: 180}},
                female: {"15-16": {excellent: 200, good: 180, average: 160, belowAverage: 140}}
            },
            sitUps: {
                male: {"15-16": {excellent: 30, good: 25, average: 20, belowAverage: 15}},
                female: {"15-16": {excellent: 28, good: 23, average: 18, belowAverage: 13}}
            },
            sprint30m: {
                male: {"15-16": {excellent: 4.0, good: 4.3, average: 4.6, belowAverage: 5.0}},
                female: {"15-16": {excellent: 4.5, good: 4.8, average: 5.1, belowAverage: 5.5}}
            }
        };

        this.init();
    }

    init() {
        this.athletes = [...this.sampleAthletes];
        this.setupEventListeners();
        this.showScreen('landing-page');
    }

    setupEventListeners() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindEvents());
        } else {
            this.bindEvents();
        }
    }

    bindEvents() {
        // Athlete form submission
        const athleteForm = document.getElementById('athlete-form');
        if (athleteForm) {
            athleteForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.registerAthlete();
            });
        }

        // Official form submission
        const officialForm = document.getElementById('official-form');
        if (officialForm) {
            officialForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.officialLogin();
            });
        }

        // Video upload handling
        const videoUpload = document.getElementById('video-upload');
        if (videoUpload) {
            videoUpload.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleVideoUpload(e.target.files[0]);
                }
            });
        }

        // Search and filter handlers
        this.setupSearchAndFilters();
    }

    setupSearchAndFilters() {
        const athleteSearch = document.getElementById('athlete-search');
        if (athleteSearch) {
            athleteSearch.addEventListener('input', () => {
                this.filterAthletes();
            });
        }

        const levelFilter = document.getElementById('level-filter');
        if (levelFilter) {
            levelFilter.addEventListener('change', () => {
                this.filterAthletes();
            });
        }
    }

    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;

            // Update specific screen content
            if (screenId === 'test-selection') {
                this.updateTestSelection();
            } else if (screenId === 'official-dashboard') {
                this.loadDashboard();
            } else if (screenId === 'athlete-profile') {
                this.updateAthleteProfile();
            }
        }
    }

    // Gamification Methods
    showAchievementNotification(achievement, xpGained) {
        const notification = document.getElementById('achievement-notification');
        if (!notification) return;

        const titleEl = notification.querySelector('.achievement-title');
        const descEl = notification.querySelector('.achievement-description');
        const pointsEl = notification.querySelector('.achievement-points');
        const iconEl = notification.querySelector('.achievement-icon i');

        const badgeData = this.badges.find(b => b.id === achievement);
        if (badgeData) {
            titleEl.textContent = `Achievement Unlocked: ${badgeData.name}`;
            descEl.textContent = badgeData.description;
            pointsEl.textContent = `+${xpGained || badgeData.points} XP`;
            iconEl.className = badgeData.icon;
        }

        notification.classList.remove('hidden');
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 4000);
    }

    animatePointsGained(points) {
        const animation = document.getElementById('point-animation');
        if (!animation) return;

        const pointsEl = animation.querySelector('.points-earned');
        
        pointsEl.textContent = `+${points} XP`;
        animation.classList.remove('hidden');
        
        setTimeout(() => {
            animation.classList.add('hidden');
        }, 2000);
    }

    calculateLevel(xp) {
        for (let i = this.levels.length - 1; i >= 0; i--) {
            if (xp >= this.levels[i].minXP) {
                return this.levels[i];
            }
        }
        return this.levels[0];
    }

    calculateLevelProgress(xp) {
        const currentLevel = this.calculateLevel(xp);
        const nextLevel = this.levels.find(l => l.level === currentLevel.level + 1);
        if (!nextLevel) return 100;
        
        const progress = ((xp - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100;
        return Math.min(100, Math.max(0, progress));
    }

    awardPoints(testType, rating, bonuses = {}) {
        const ratingKey = rating.toLowerCase().replace(' ', '');
        const basePoints = this.pointRewards[testType][ratingKey] || this.pointRewards[testType].average;
        let totalPoints = basePoints;

        // Apply bonuses
        if (bonuses.perfectForm) totalPoints += 50;
        if (bonuses.speedBonus) totalPoints += 30;
        if (bonuses.personalBest) totalPoints += 100;
        if (bonuses.dailyBonus) totalPoints = Math.floor(totalPoints * 1.5);

        // Update user points
        if (this.currentUser) {
            this.currentUser.xp = (this.currentUser.xp || 0) + totalPoints;
            this.currentUser.points = this.currentUser.xp;
            this.currentUser.level = this.calculateLevel(this.currentUser.xp).level;
        }

        // Animate points
        this.animatePointsGained(totalPoints);

        return totalPoints;
    }

    checkAchievements() {
        if (!this.currentUser) return;

        const completedTests = Object.keys(this.testResults).length;
        const userBadges = this.currentUser.badges || [];

        // First test completion
        if (completedTests === 1 && !userBadges.includes('first-test')) {
            userBadges.push('first-test');
            this.showAchievementNotification('first-test', 100);
        }

        // All tests completed
        if (completedTests === 3 && !userBadges.includes('consistency-master')) {
            userBadges.push('consistency-master');
            this.showAchievementNotification('consistency-master', 300);
        }

        // Perfect score check
        const hasExcellent = Object.values(this.testResults).some(result => result.rating === 'Excellent');
        if (hasExcellent && !userBadges.includes('perfect-score')) {
            userBadges.push('perfect-score');
            this.showAchievementNotification('perfect-score', 200);
        }

        this.currentUser.badges = userBadges;
    }

    registerAthlete() {
        const name = document.getElementById('athlete-name').value;
        const age = parseInt(document.getElementById('athlete-age').value);
        const gender = document.getElementById('athlete-gender').value;
        const location = document.getElementById('athlete-location').value;

        this.currentUser = {
            name,
            age,
            gender,
            location,
            level: 1,
            xp: 100, // Welcome bonus
            points: 100,
            badges: [],
            streak: 1,
            tests: {},
            overallScore: 0,
            dateAssessed: new Date().toISOString().split('T')[0]
        };

        this.testResults = {};
        
        // Show welcome animation
        this.animatePointsGained(100);
        
        // Navigate to profile
        setTimeout(() => {
            this.showScreen('athlete-profile');
        }, 1000);
    }

    updateAthleteProfile() {
        if (!this.currentUser) return;

        const currentLevel = this.calculateLevel(this.currentUser.xp);
        const levelProgress = this.calculateLevelProgress(this.currentUser.xp);
        const nextLevel = this.levels.find(l => l.level === currentLevel.level + 1);

        // Update profile header
        const nameEl = document.getElementById('profile-athlete-name');
        const detailsEl = document.getElementById('profile-athlete-details');
        const levelEl = document.getElementById('athlete-level');
        const pointsEl = document.getElementById('athlete-points');
        const streakEl = document.getElementById('athlete-streak');

        if (nameEl) nameEl.textContent = this.currentUser.name;
        if (detailsEl) detailsEl.textContent = `${this.currentUser.age} years • ${this.currentUser.gender} • ${this.currentUser.location}`;
        if (levelEl) levelEl.textContent = this.currentUser.level;
        if (pointsEl) pointsEl.textContent = this.currentUser.xp.toLocaleString();
        if (streakEl) streakEl.textContent = this.currentUser.streak;

        // Update level progress
        const levelProgressEl = document.getElementById('level-progress');
        if (levelProgressEl) {
            levelProgressEl.style.width = `${levelProgress}%`;
        }

        const levelInfo = document.querySelector('.level-info');
        if (levelInfo) {
            const currentLevelSpan = levelInfo.querySelector('.current-level');
            const nextLevelSpan = levelInfo.querySelector('.next-level');
            
            if (currentLevelSpan) {
                currentLevelSpan.textContent = `Level ${currentLevel.level} - ${currentLevel.name}`;
            }
            
            if (nextLevelSpan && nextLevel) {
                const xpNeeded = nextLevel.minXP - this.currentUser.xp;
                nextLevelSpan.textContent = `Next: ${nextLevel.name} (${xpNeeded} XP to go)`;
            }
        }

        // Update XP info
        const xpInfo = document.querySelector('.xp-info');
        if (xpInfo && nextLevel) {
            xpInfo.textContent = `${this.currentUser.xp.toLocaleString()} / ${nextLevel.minXP.toLocaleString()} XP`;
        }

        // Update badges
        this.updateBadgesDisplay();
    }

    updateBadgesDisplay() {
        const badgesGrid = document.getElementById('badges-grid');
        if (!badgesGrid) return;

        const userBadges = this.currentUser.badges || [];
        
        badgesGrid.innerHTML = '';
        
        this.badges.forEach(badge => {
            const badgeEl = document.createElement('div');
            badgeEl.className = `badge-item ${userBadges.includes(badge.id) ? 'earned' : 'locked'}`;
            
            badgeEl.innerHTML = `
                <div class="badge-icon">
                    <i class="${badge.icon}"></i>
                </div>
                <div class="badge-name">${badge.name}</div>
            `;
            
            badgesGrid.appendChild(badgeEl);
        });
    }

    officialLogin() {
        const officialId = document.getElementById('official-id').value;
        const password = document.getElementById('official-password').value;

        if (officialId === 'demo-official' && password === 'sai2024') {
            this.currentUser = { type: 'official', id: officialId };
            this.showScreen('official-dashboard');
        } else {
            alert('Invalid credentials. Please use demo credentials:\nID: demo-official\nPassword: sai2024');
        }
    }

    updateTestSelection() {
        const completedCount = Object.keys(this.testResults).length;
        let totalXPEarned = 0;

        // Update test status indicators and calculate total XP
        Object.entries(this.testResults).forEach(([testKey, result]) => {
            const card = document.querySelector(`[data-test="${testKey}"]`);
            if (card) {
                const status = card.querySelector('.test-status');
                status.innerHTML = '<i class="fas fa-check"></i><span>Completed</span>';
                status.classList.remove('incomplete');
                status.classList.add('complete');
                
                totalXPEarned += result.pointsEarned || 0;
            }
        });

        // Show summary if tests completed
        if (completedCount > 0) {
            const completedEl = document.getElementById('completed-tests');
            if (completedEl) {
                completedEl.style.display = 'block';
                const avgScore = this.calculateOverallScore();
                const overallScoreEl = document.getElementById('overall-score');
                const totalXPEl = document.getElementById('total-xp-earned');
                
                if (overallScoreEl) overallScoreEl.textContent = avgScore;
                if (totalXPEl) totalXPEl.textContent = totalXPEarned.toLocaleString();
            }
        }
    }

    startTest(testType) {
        this.currentTest = testType;
        this.showInstructions();
    }

    showInstructions() {
        const test = this.testDescriptions[this.currentTest];
        
        // Update instruction content
        const iconEl = document.getElementById('instruction-icon');
        const titleEl = document.getElementById('instruction-title');
        const descEl = document.getElementById('instruction-description');
        const equipEl = document.getElementById('instruction-equipment');
        const durationEl = document.getElementById('instruction-duration');
        const xpPotentialEl = document.getElementById('xp-potential');
        const difficultyEl = document.getElementById('difficulty-level');

        if (iconEl) iconEl.innerHTML = `<i class="${test.icon}"></i>`;
        if (titleEl) titleEl.textContent = test.name;
        if (descEl) descEl.textContent = test.description;
        if (equipEl) equipEl.textContent = test.equipment;
        if (durationEl) durationEl.textContent = test.duration;
        if (xpPotentialEl) xpPotentialEl.textContent = test.pointReward;
        if (difficultyEl) difficultyEl.textContent = `${test.difficulty} Difficulty`;

        // Update instruction steps
        const stepsList = document.getElementById('instruction-steps');
        if (stepsList) {
            stepsList.innerHTML = '';
            test.instructions.forEach(instruction => {
                const li = document.createElement('li');
                li.textContent = instruction;
                stepsList.appendChild(li);
            });
        }

        this.showScreen('test-instructions');
    }

    startRecording() {
        const test = this.testDescriptions[this.currentTest];
        const titleEl = document.getElementById('recording-title');
        const xpPotentialEl = document.getElementById('recording-xp-potential');
        
        if (titleEl) titleEl.textContent = `Recording: ${test.name}`;
        if (xpPotentialEl) xpPotentialEl.textContent = test.pointReward.split(' ')[0];
        
        this.showScreen('video-recording');
        this.resetRecordingInterface();
    }

    resetRecordingInterface() {
        const recordBtn = document.getElementById('record-btn');
        const indicator = document.getElementById('recording-indicator');
        const timer = document.getElementById('recording-timer');
        
        if (recordBtn) {
            recordBtn.innerHTML = '<i class="fas fa-circle"></i>Start Recording';
            recordBtn.classList.remove('recording');
        }
        if (indicator) indicator.classList.remove('active');
        if (timer) timer.textContent = '00:00';
    }

    toggleRecording() {
        const recordBtn = document.getElementById('record-btn');
        const indicator = document.getElementById('recording-indicator');
        
        if (!recordBtn) return;
        
        if (recordBtn.classList.contains('recording')) {
            // Stop recording
            recordBtn.innerHTML = '<i class="fas fa-circle"></i>Start Recording';
            recordBtn.classList.remove('recording');
            if (indicator) indicator.classList.remove('active');
            
            // Simulate processing
            setTimeout(() => {
                this.processRecording();
            }, 1000);
        } else {
            // Start recording
            recordBtn.innerHTML = '<i class="fas fa-stop"></i>Stop Recording';
            recordBtn.classList.add('recording');
            if (indicator) indicator.classList.add('active');
            
            // Start timer simulation
            this.startTimer();
        }
    }

    startTimer() {
        let seconds = 0;
        const timer = document.getElementById('recording-timer');
        
        const interval = setInterval(() => {
            const recordBtn = document.getElementById('record-btn');
            if (!recordBtn || !recordBtn.classList.contains('recording')) {
                clearInterval(interval);
                return;
            }
            
            seconds++;
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            if (timer) {
                timer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    handleVideoUpload(file) {
        setTimeout(() => {
            this.processRecording();
        }, 1500);
    }

    processRecording() {
        this.showScreen('ai-analysis');
        this.simulateAIAnalysis();
    }

    simulateAIAnalysis() {
        const steps = [
            { id: 'step-1', progress: 'progress-1', duration: 1000 },
            { id: 'step-2', progress: 'progress-2', duration: 1500 },
            { id: 'step-3', progress: 'progress-3', duration: 2000 },
            { id: 'step-4', progress: 'progress-4', duration: 1000 }
        ];

        let currentStep = 0;

        const processStep = () => {
            if (currentStep >= steps.length) {
                setTimeout(() => {
                    this.generateTestResults();
                }, 500);
                return;
            }

            const step = steps[currentStep];
            const stepElement = document.getElementById(step.id);
            const progressElement = document.getElementById(step.progress);
            const statusElement = stepElement?.querySelector('.step-status');

            if (!stepElement || !progressElement) {
                currentStep++;
                setTimeout(processStep, 100);
                return;
            }

            // Mark step as active
            stepElement.classList.add('active');
            if (statusElement) statusElement.textContent = 'Processing...';

            // Animate progress
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 2;
                progressElement.style.width = `${progress}%`;

                if (progress >= 100) {
                    clearInterval(progressInterval);
                    stepElement.classList.remove('active');
                    stepElement.classList.add('complete');
                    if (statusElement) statusElement.textContent = 'Complete';
                    
                    currentStep++;
                    setTimeout(processStep, 200);
                }
            }, step.duration / 50);
        };

        processStep();
    }

    generateTestResults() {
        const testType = this.currentTest;
        const user = this.currentUser;
        let result;

        // Generate realistic results based on test type and user demographics
        switch (testType) {
            case 'broadJump':
                result = this.generateBroadJumpResult(user);
                break;
            case 'sitUps':
                result = this.generateSitUpsResult(user);
                break;
            case 'sprint30m':
                result = this.generateSprintResult(user);
                break;
        }

        // Award points and check for bonuses
        const bonuses = {
            perfectForm: result.formScore > 90,
            speedBonus: Math.random() > 0.7,
            dailyBonus: true // Daily bonus active
        };

        const pointsEarned = this.awardPoints(testType, result.rating, bonuses);
        result.pointsEarned = pointsEarned;
        result.bonuses = bonuses;

        this.testResults[testType] = result;
        
        // Check achievements
        this.checkAchievements();
        
        this.showTestResults(result);
    }

    generateBroadJumpResult(user) {
        const benchmark = this.benchmarks.broadJump[user.gender.toLowerCase()]["15-16"];
        const baseDistance = user.gender === 'Male' ? 
            180 + Math.random() * 80 : 
            140 + Math.random() * 80;
        
        const distance = Math.round(baseDistance);
        const rating = this.getRating(distance, benchmark, false);
        const percentile = this.calculatePercentile(distance, benchmark, false);

        return {
            distance,
            rating,
            percentile,
            formScore: 85 + Math.random() * 10,
            confidenceScore: 92 + Math.random() * 6
        };
    }

    generateSitUpsResult(user) {
        const benchmark = this.benchmarks.sitUps[user.gender.toLowerCase()]["15-16"];
        const baseReps = user.gender === 'Male' ? 
            15 + Math.random() * 20 : 
            13 + Math.random() * 20;
        
        const reps = Math.round(baseReps);
        const rating = this.getRating(reps, benchmark, false);
        const percentile = this.calculatePercentile(reps, benchmark, false);

        return {
            reps,
            rating,
            percentile,
            formScore: 88 + Math.random() * 8,
            confidenceScore: 94 + Math.random() * 4
        };
    }

    generateSprintResult(user) {
        const benchmark = this.benchmarks.sprint30m[user.gender.toLowerCase()]["15-16"];
        const baseTime = user.gender === 'Male' ? 
            4.0 + Math.random() * 1.2 : 
            4.5 + Math.random() * 1.2;
        
        const time = Math.round(baseTime * 10) / 10;
        const rating = this.getRating(time, benchmark, true);
        const percentile = this.calculatePercentile(time, benchmark, true);

        return {
            time,
            rating,
            percentile,
            formScore: 90 + Math.random() * 8,
            confidenceScore: 93 + Math.random() * 5
        };
    }

    getRating(value, benchmark, isTimeTest) {
        if (isTimeTest) {
            if (value <= benchmark.excellent) return 'Excellent';
            if (value <= benchmark.good) return 'Good';
            if (value <= benchmark.average) return 'Average';
            return 'Below Average';
        } else {
            if (value >= benchmark.excellent) return 'Excellent';
            if (value >= benchmark.good) return 'Good';
            if (value >= benchmark.average) return 'Average';
            return 'Below Average';
        }
    }

    calculatePercentile(value, benchmark, isTimeTest) {
        if (isTimeTest) {
            if (value <= benchmark.excellent) return 90 + Math.random() * 10;
            if (value <= benchmark.good) return 70 + Math.random() * 20;
            if (value <= benchmark.average) return 40 + Math.random() * 30;
            return Math.random() * 40;
        } else {
            if (value >= benchmark.excellent) return 90 + Math.random() * 10;
            if (value >= benchmark.good) return 70 + Math.random() * 20;
            if (value >= benchmark.average) return 40 + Math.random() * 30;
            return Math.random() * 40;
        }
    }

    showTestResults(result) {
        const test = this.testDescriptions[this.currentTest];

        // Update celebration
        const xpEarnedEl = document.getElementById('xp-earned-display');
        if (xpEarnedEl) xpEarnedEl.textContent = `+${result.pointsEarned} XP`;

        // Update results header
        const iconEl = document.getElementById('results-icon');
        const titleEl = document.getElementById('results-title');
        const ratingEl = document.getElementById('overall-rating');

        if (iconEl) iconEl.innerHTML = `<i class="${test.icon}"></i>`;
        if (titleEl) titleEl.textContent = `${test.name} Results`;
        if (ratingEl) ratingEl.textContent = result.rating;

        // Update primary metric
        let primaryValue, primaryLabel;
        if (this.currentTest === 'broadJump') {
            primaryValue = `${result.distance} cm`;
            primaryLabel = 'Distance';
        } else if (this.currentTest === 'sitUps') {
            primaryValue = `${result.reps} reps`;
            primaryLabel = 'Repetitions';
        } else if (this.currentTest === 'sprint30m') {
            primaryValue = `${result.time} sec`;
            primaryLabel = 'Time';
        }
        
        const labelEl = document.getElementById('primary-metric-label');
        const valueEl = document.getElementById('primary-metric-value');
        if (labelEl) labelEl.textContent = primaryLabel;
        if (valueEl) valueEl.textContent = primaryValue;
        
        // Update secondary metrics
        const percentileEl = document.getElementById('percentile-value');
        const formScoreEl = document.getElementById('form-score');
        if (percentileEl) percentileEl.textContent = `${Math.round(result.percentile)}th`;
        if (formScoreEl) formScoreEl.textContent = `${Math.round(result.formScore)}%`;

        // Update level progress
        const currentLevel = this.calculateLevel(this.currentUser.xp);
        const levelProgress = this.calculateLevelProgress(this.currentUser.xp);
        const nextLevel = this.levels.find(l => l.level === currentLevel.level + 1);

        const levelEl = document.getElementById('results-level');
        const progressEl = document.getElementById('results-level-progress');
        const xpInfoEl = document.getElementById('results-xp-info');

        if (levelEl) levelEl.textContent = `Level ${currentLevel.level} - ${currentLevel.name}`;
        if (progressEl) progressEl.style.width = `${levelProgress}%`;
        
        if (nextLevel && xpInfoEl) {
            xpInfoEl.textContent = `${this.currentUser.xp.toLocaleString()} / ${nextLevel.minXP.toLocaleString()} XP`;
        }

        this.showScreen('test-results');
    }

    calculateOverallScore() {
        const results = Object.values(this.testResults);
        if (results.length === 0) return 0;

        const totalPercentile = results.reduce((sum, result) => sum + result.percentile, 0);
        return Math.round(totalPercentile / results.length);
    }

    viewResults() {
        alert('Comprehensive results view would show detailed analytics, progress charts, and performance insights!');
    }

    shareResults() {
        const overallScore = this.calculateOverallScore();
        const totalXP = this.currentUser?.xp || 0;
        const level = this.calculateLevel(totalXP);
        
        const shareText = `🏆 Just completed my SAI Assessment!\n` +
                         `📊 Overall Score: ${overallScore}\n` +
                         `⭐ Level ${level.level} - ${level.name}\n` +
                         `🎯 ${totalXP.toLocaleString()} Total XP\n` +
                         `\nChallenge yourself at SAI Talent Platform! 💪`;

        if (navigator.share) {
            navigator.share({
                title: 'My SAI Assessment Results',
                text: shareText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Results copied to clipboard!');
            }).catch(() => {
                alert('Results ready to share:\n\n' + shareText);
            });
        }
    }

    showLeaderboard() {
        this.showScreen('leaderboard');
    }

    loadDashboard() {
        this.showDashboardOverview();
        this.loadAthleteManagement();
    }

    showDashboardOverview() {
        this.showDashboardSection('dashboard-overview');
    }

    showAthleteManagement() {
        this.showDashboardSection('athlete-management');
        this.renderAthleteList();
    }

    showGamificationStats() {
        this.showDashboardSection('gamification-stats');
    }

    showReports() {
        alert('Advanced reporting features would include detailed analytics, trend analysis, and exportable reports!');
    }

    showDashboardSection(sectionId) {
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Update active nav item based on section
        const navItems = document.querySelectorAll('.nav-item');
        if (sectionId === 'dashboard-overview') navItems[0]?.classList.add('active');
        else if (sectionId === 'athlete-management') navItems[1]?.classList.add('active');
        else if (sectionId === 'gamification-stats') navItems[2]?.classList.add('active');
        else if (sectionId === 'reports') navItems[3]?.classList.add('active');
    }

    renderAthleteList() {
        const athleteList = document.getElementById('athlete-list');
        if (!athleteList) return;
        
        athleteList.innerHTML = '';

        this.athletes.forEach(athlete => {
            const row = document.createElement('div');
            row.className = 'table-row';
            row.innerHTML = `
                <div class="table-cell" data-label="Athlete">
                    <div style="display: flex; flex-direction: column;">
                        <strong>${athlete.name}</strong>
                        <small style="color: var(--color-text-secondary);">${athlete.location}</small>
                    </div>
                </div>
                <div class="table-cell" data-label="Level">
                    <div class="level-badge level-${athlete.level}">L${athlete.level}</div>
                </div>
                <div class="table-cell" data-label="XP">
                    <strong>${athlete.xp.toLocaleString()}</strong>
                </div>
                <div class="table-cell" data-label="Badges">${athlete.badges.length}</div>
                <div class="table-cell" data-label="Streak">
                    <div style="display: flex; align-items: center; gap: 4px;">
                        <i class="fas fa-fire" style="color: var(--color-streak);"></i>
                        ${athlete.streak}
                    </div>
                </div>
                <div class="table-cell" data-label="Actions">
                    <button class="btn btn--sm btn--outline" onclick="app.viewAthleteProfile(${athlete.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            `;
            athleteList.appendChild(row);
        });
    }

    filterAthletes() {
        const searchTerm = document.getElementById('athlete-search')?.value.toLowerCase() || '';
        const levelFilter = document.getElementById('level-filter')?.value || '';

        const filteredAthletes = this.sampleAthletes.filter(athlete => {
            const matchesSearch = athlete.name.toLowerCase().includes(searchTerm) ||
                                athlete.location.toLowerCase().includes(searchTerm);
            const matchesLevel = !levelFilter || athlete.level.toString() === levelFilter;
            
            return matchesSearch && matchesLevel;
        });

        this.athletes = filteredAthletes;
        this.renderAthleteList();
    }

    viewAthleteProfile(athleteId) {
        const athlete = this.sampleAthletes.find(a => a.id === athleteId);
        if (!athlete) return;

        alert(`Detailed profile view for ${athlete.name} would be implemented here with comprehensive analytics!`);
    }
}

// Global functions for HTML onclick events
function showLanding() {
    app.showScreen('landing-page');
}

function showAthleteLogin() {
    app.showScreen('athlete-login');
}

function showOfficialLogin() {
    app.showScreen('official-login');
}

function showTestSelection() {
    app.showScreen('test-selection');
}

function showAthleteProfile() {
    app.showScreen('athlete-profile');
}

function showInstructions() {
    app.showInstructions();
}

function startTest(testType) {
    app.startTest(testType);
}

function startRecording() {
    app.startRecording();
}

function toggleRecording() {
    app.toggleRecording();
}

function viewResults() {
    app.viewResults();
}

function shareResults() {
    app.shareResults();
}

function showLeaderboard() {
    app.showLeaderboard();
}

function showDashboardOverview() {
    app.showDashboardOverview();
}

function showAthleteManagement() {
    app.showAthleteManagement();
}

function showGamificationStats() {
    app.showGamificationStats();
}

function showReports() {
    app.showReports();
}

// Initialize the application
const app = new GamifiedSAIApp();

// Enhanced UI interactions without problematic loading states
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Simple ripple effect for buttons (without interfering with navigation)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn') && !e.target.closest('.btn').classList.contains('record-btn')) {
            const button = e.target.closest('.btn');
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
    
    // Card hover effects
    document.querySelectorAll('.test-card, .test-option-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Progress bar animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(progressBar => {
                    if (progressBar.style.width) {
                        const targetWidth = progressBar.style.width;
                        progressBar.style.width = '0%';
                        setTimeout(() => {
                            progressBar.style.width = targetWidth;
                        }, 100);
                    }
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.progress-bar').forEach(bar => {
        progressObserver.observe(bar);
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const backButton = document.querySelector('.back-btn');
            if (backButton && backButton.offsetParent !== null) {
                backButton.click();
            }
        }
    });

    console.log('SAI Gamified Assessment Platform initialized successfully!');
});

// CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}