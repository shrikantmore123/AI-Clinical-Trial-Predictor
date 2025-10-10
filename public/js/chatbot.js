// Chatbot functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const typingIndicator = document.getElementById('typingIndicator');
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');

    // FAQ Database
    const faqDatabase = {
        'what is medpredict': {
            answer: "MedPredict AI is an advanced clinical trial prediction platform that uses artificial intelligence and machine learning to analyze molecular structures, predict drug efficacy, and forecast clinical trial outcomes with up to 94% accuracy.",
            followUp: ["How does it work?", "What makes it different?"]
        },
        'how accurate are your predictions': {
            answer: "Our AI models achieve 94% accuracy in predicting clinical trial outcomes, based on analysis of 50,000+ historical trials. The system continuously learns and improves from new data.",
            followUp: ["What data do you use?", "How is accuracy measured?"]
        },
        'how do i start a clinical analysis': {
            answer: "You can start by clicking the 'Start Clinical Analysis' button on our homepage. You'll need to provide basic information about your compound, target indications, and any existing preclinical data.",
            followUp: ["What information is needed?", "How long does analysis take?"]
        },
        'what makes it different': {
            answer: "Unlike traditional methods, MedPredict uses deep neural networks trained on molecular structures, genetic data, and historical trial outcomes. We provide actionable insights beyond simple success/failure predictions.",
            followUp: ["What type of AI do you use?", "Can it predict side effects?"]
        },
        'what data do you use': {
            answer: "We analyze molecular structures, genetic markers, protein interactions, historical trial data, patient demographics, and real-world evidence from over 50,000 clinical trials.",
            followUp: ["Is my data secure?", "How is data processed?"]
        },
        'how long does analysis take': {
            answer: "Standard analysis typically takes 24-48 hours. Complex cases with multiple compounds may take up to 72 hours. You'll receive a comprehensive report with predictions and recommendations.",
            followUp: ["What's in the report?", "Can I get expedited analysis?"]
        },
        'is my data secure': {
            answer: "Yes, we use enterprise-grade encryption, comply with HIPAA and GDPR regulations, and maintain strict data access controls. Your research data is always protected.",
            followUp: ["Do you share data?", "What about compliance?"]
        },
        'what type of ai do you use': {
            answer: "We use ensemble methods combining deep neural networks, graph neural networks for molecular analysis, and transformer models for natural language processing of medical literature.",
            followUp: ["How are models validated?", "Do you use explainable AI?"]
        },
        'can it predict side effects': {
            answer: "Yes, our toxicity prediction module can identify potential adverse effects with 89% accuracy by analyzing molecular properties and comparing against known toxic compounds.",
            followUp: ["How accurate is toxicity prediction?", "What about drug interactions?"]
        },
        'pricing': {
            answer: "We offer flexible pricing models including per-analysis fees, subscription plans for research institutions, and enterprise solutions for pharmaceutical companies. Contact us for a custom quote.",
            followUp: ["Do you offer trials?", "Academic discounts?"]
        },
        'contact support': {
            answer: "You can reach our support team at support@medpredict.ai or call +1 (555) 123-HELP. Our clinical experts are available 24/7 for urgent inquiries.",
            followUp: ["What are support hours?", "Emergency contact?"]
        }
    };

    // Default responses
    const defaultResponses = [
        "I understand you're asking about \"{query}\". While I specialize in clinical trial predictions and AI analysis, I'd be happy to connect you with a human expert for more specific questions.",
        "That's an interesting question about \"{query}\". My expertise is in clinical trial AI predictions. Would you like to know more about how our platform works?",
        "I'm primarily trained to assist with clinical trial analysis and predictions. For questions about \"{query}\", our support team would be better equipped to help."
    ];

    // Initialize chatbot
    function initChatbot() {
        // Toggle chatbot
        chatbotToggle.addEventListener('click', toggleChatbot);
        chatbotClose.addEventListener('click', toggleChatbot);

        // Send message on button click
        chatbotSend.addEventListener('click', sendMessage);

        // Send message on Enter key
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Quick action buttons
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const question = this.getAttribute('data-question');
                chatbotInput.value = question;
                sendMessage();
            });
        });

        // Auto-open on page load (optional)
        setTimeout(() => {
            // Uncomment below line to auto-open chatbot
            // toggleChatbot();
        }, 3000);
    }

    // Toggle chatbot visibility
    function toggleChatbot() {
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {
            chatbotInput.focus();
            // Hide notification when opened
            document.querySelector('.chatbot-notification').style.display = 'none';
        }
    }

    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Simulate AI response delay
        setTimeout(() => {
            hideTypingIndicator();
            const response = getAIResponse(message);
            addMessage(response.answer, 'bot');

            // Add follow-up questions if available
            if (response.followUp && response.followUp.length > 0) {
                setTimeout(() => {
                    addFollowUpQuestions(response.followUp);
                }, 500);
            }
        }, 1500);
    }

    // Add message to chat
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${sender === 'bot' ? 'stethoscope' : 'user'}"></i>
            </div>
            <div class="message-content">
                <p>${content}</p>
                <span class="message-time">${time}</span>
            </div>
        `;

        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }

    // Add follow-up questions
    function addFollowUpQuestions(questions) {
        const quickActions = document.querySelector('.quick-actions');
        quickActions.innerHTML = ''; // Clear existing buttons

        questions.forEach(question => {
            const button = document.createElement('button');
            button.className = 'quick-action-btn';
            button.textContent = question;
            button.setAttribute('data-question', question);
            button.addEventListener('click', function() {
                chatbotInput.value = question;
                sendMessage();
            });
            quickActions.appendChild(button);
        });

        // Reset to default buttons after 30 seconds
        setTimeout(() => {
            resetQuickActions();
        }, 30000);
    }

    // Reset quick actions to default
    function resetQuickActions() {
        const quickActions = document.querySelector('.quick-actions');
        quickActions.innerHTML = `
            <button class="quick-action-btn" data-question="What is MedPredict AI?">
                What is MedPredict?
            </button>
            <button class="quick-action-btn" data-question="How accurate are your predictions?">
                Prediction Accuracy
            </button>
            <button class="quick-action-btn" data-question="How do I start a clinical analysis?">
                Start Analysis
            </button>
        `;

        // Reattach event listeners
        document.querySelectorAll('.quick-action-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const question = this.getAttribute('data-question');
                chatbotInput.value = question;
                sendMessage();
            });
        });
    }

    // Get AI response
    function getAIResponse(query) {
        const lowerQuery = query.toLowerCase().trim();

        // Check for exact matches
        for (const [key, value] of Object.entries(faqDatabase)) {
            if (lowerQuery.includes(key)) {
                return value;
            }
        }

        // Check for partial matches
        for (const [key, value] of Object.entries(faqDatabase)) {
            const keywords = key.split(' ');
            const matchCount = keywords.filter(keyword => lowerQuery.includes(keyword)).length;
            
            if (matchCount >= keywords.length * 0.6) { // 60% match threshold
                return value;
            }
        }

        // Default response
        const randomResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        return {
            answer: randomResponse.replace('{query}', query),
            followUp: ["What is MedPredict AI?", "How accurate are predictions?", "How to start analysis?"]
        };
    }

    // Show typing indicator
    function showTypingIndicator() {
        typingIndicator.classList.add('active');
        scrollToBottom();
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        typingIndicator.classList.remove('active');
    }

    // Scroll to bottom of messages
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Initialize the chatbot
    initChatbot();
});