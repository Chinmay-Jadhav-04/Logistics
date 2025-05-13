'use client';
import { useState, useEffect, useRef } from 'react';
import './chatbot.css';

export default function ChatBot() {
  // Start with the chatbot closed
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '👋 Hello! I\'m your Green Ocean Logistics assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  // Initialize with current time to start the proactive messaging
  const [lastProactiveTime, setLastProactiveTime] = useState(Date.now());
  const messagesEndRef = useRef(null);

  // Knowledge base for the chatbot
  const knowledgeBase = {
    // Company information
    "who are you": "I am the virtual assistant for Green Ocean Logistics, here to help you with all your logistics needs and answer any questions about our services.",
    "about company": "Green Ocean Logistics is a leading global logistics provider offering comprehensive supply chain solutions. We specialize in freight forwarding, warehousing, customs clearance, and specialized logistics services.",
    "features": "Green Ocean Logistics offers several key features including: Smart Container Service Marketplace, Centralized Request Management Dashboard, Real-Time Communication Portal, Automated Pricing Engine & Tax Invoice Generation, and Performance Analytics and Optimization Suggestions.",
    "services": "Our core services include international freight forwarding (air, sea, and land), warehousing and distribution, customs brokerage, project logistics, and supply chain consulting.",
    "contact": "You can reach our customer service team at support@greenoceanlogistics.com or call our 24/7 hotline.",

    // Specific services
    "eir": "To request EIR/COP, go to the EIR/COP Request section in our dashboard. This allows you to generate and manage your Equipment Interchange Receipts.",
    "cop": "To request EIR/COP, go to the EIR/COP Request section in our dashboard. This allows you to generate and manage your Container Offloading Permits.",
    "priority": "You can use the Priority Movements Request option for urgent containers. This service ensures your shipments are handled with the highest priority.",
    "weighment": "Weighment Slip Request allows you to generate container weight slips. This is essential for compliance with shipping regulations.",
    "invoice": "Use the Tax Invoice Request option to generate your invoice. Our automated system ensures accurate and timely invoice generation.",
    "grounding": "Use Container Grounding for placing your container on ground. This service is available through our dashboard.",
    "job order": "Go to Job Order Update Request to modify your existing orders. This allows you to make changes to your logistics requests as needed.",

    // Transport services
    "land transport": "Our Land Transport services include Express Freight Trucking, Full Truckload (FTL) Services, Less Than Truckload (LTL), and Refrigerated Transport across India.",
    "sea freight": "Our Sea Freight services include FCL (Full Container Load) and LCL (Less than Container Load) options for global ocean shipping with competitive rates and reliable schedules.",
    "air freight": "We offer premium Air Freight services for time-sensitive shipments with global coverage and expedited customs clearance.",

    // Warehouse services
    "bonded warehouse": "We operate several Bonded Warehouse facilities including Mumbai Port Bonded Warehouse and Bangalore Air Cargo Complex, offering secure customs bonded facilities with duty deferment.",
    "3pl": "Our 3PL services include Integrated Supply Chain Solutions, E-Commerce Fulfillment Center, Customized Logistics Services, and Warehousing and Distribution across multiple locations in India.",

    // CFS/ICD information
    "cfs": "Our Container Freight Station (CFS) services provide efficient container handling, storage, and distribution. We have multiple CFS facilities across India including Gateway Distriparks, Chennai ICD, Delhi ICD, and Kolkata CFS. Would you like to know more about a specific CFS?",
    "icd": "Our Inland Container Depots (ICD) offer customs clearance, container handling, and storage services away from port locations. Our major ICDs include Chennai ICD and Delhi ICD. Would you like to know more about a specific ICD?",
    "cfs list": "We operate the following Container Freight Stations (CFS):\n1. Gateway Distriparks Limited (Mumbai)\n2. Chennai ICD\n3. Delhi ICD (Tughlakabad)\n4. Kolkata CFS\n5. EverCFS (Mumbai Port)\n6. GreenLogix (Chennai Port)\n7. SwiftCargo (JNPT)\n\nWhich CFS would you like to know more about?",

    // Specific CFS information
    "gateway": "Gateway Distriparks Limited (Mumbai):\n• Location: Nhava Sheva, Mumbai\n• Rating: 4.8/5\n• Services: Container handling, customs clearance, warehousing, transportation\n• Features: India's Leading Integrated Intermodal Logistics Company\n• Tariff Rate: ₹5,001-10,000\n• Free Days: 7 days\n• Monthly Dues: ₹10,000-20,000\n• Container Capacity: 20-50 containers",

    "chennai icd": "Chennai ICD:\n• Location: Chennai Port Trust\n• Rating: 4.3/5\n• Services: Container handling, customs clearance, warehousing\n• Features: Modern inland container depot with efficient customs clearance\n• Tariff Rate: ₹10,001-15,000\n• Free Days: 10 days\n• Monthly Dues: Above ₹20,000\n• Container Capacity: 1-20 containers",

    "delhi icd": "Delhi ICD (Tughlakabad):\n• Location: Tughlakabad, New Delhi\n• Rating: 4.0/5\n• Features: Excellent rail connectivity to major ports and industrial areas\n• Tariff Rate: ₹0-5,000\n• Free Days: 30 days\n• Monthly Dues: ₹5,000-10,000\n• Container Capacity: 50+ containers",

    "kolkata cfs": "Kolkata CFS:\n• Location: Kolkata Port Area, West Bengal\n• Rating: 3.8/5\n• Features: Strategic CFS located near the Kolkata port with customs facilities and warehousing options\n• Tariff Rate: ₹15,000+\n• Free Days: 15 days\n• Monthly Dues: ₹20,000-30,000\n• Container Capacity: 20-50 containers",

    "evercfs": "EverCFS:\n• Location: Mumbai Port\n• Rating: 4.8/5\n• Services: 5 types\n• Features: State-of-the-art container freight station with modern facilities\n• Turnaround Time: 6 hours\n• Price: ₹1,500\n• Container Types: 4",

    "greenlogix": "GreenLogix:\n• Location: Chennai Port\n• Rating: 4.5/5\n• Services: 4 types\n• Features: Eco-friendly CFS with advanced handling equipment\n• Turnaround Time: 10 hours\n• Price: ₹1,800\n• Container Types: 4",

    "swiftcargo": "SwiftCargo:\n• Location: JNPT\n• Rating: 4.2/5\n• Services: 5 types\n• Features: Fast and efficient container processing\n• Turnaround Time: 7 hours\n• Price: ₹1,600\n• Container Types: 3",

    // Default responses
    "help": "I can help you with information about our services, features, shipping options, warehousing, and more. Just ask me about any logistics service you need assistance with!",
    "default": "I'm here to help with your logistics needs. You can ask about our services, features, shipping options, or specific requests like EIR/COP, invoicing, or container grounding."
  };

  // CFS data is already included in the knowledge base

  // Function to handle user messages and generate responses
  const getBotReply = (message) => {
    const text = message.toLowerCase();

    // Check for greetings
    if (text.match(/^(hi|hello|hey|greetings|howdy)/i)) {
      return "Hello! I'm your Green Ocean Logistics assistant. How can I help you with your logistics needs today?";
    }

    // Check for thank you
    if (text.match(/thank you|thanks|thx/i)) {
      return "You're welcome! Is there anything else I can help you with regarding your logistics needs?";
    }

    // Check for goodbye
    if (text.match(/bye|goodbye|see you|farewell/i)) {
      return "Goodbye! Feel free to return if you have more questions about Green Ocean Logistics services.";
    }

    // Check for human agent request
    if (text.includes('human') || text.includes('agent') || text.includes('person')) {
      return "I'll connect you with a human agent shortly. Please provide your contact details and a brief description of your inquiry.";
    }

    // Check for CFS list request
    if (text.includes('cfs list') || text.includes('list of cfs') || text.includes('all cfs') ||
        (text.includes('cfs') && text.includes('available')) ||
        (text.includes('container freight station') && text.includes('list'))) {
      return knowledgeBase["cfs list"];
    }

    // Check for general CFS information
    if ((text.includes('cfs') || text.includes('container freight station')) &&
        !text.includes('specific') && !text.includes('details') && !text.includes('which')) {
      return knowledgeBase["cfs"];
    }

    // Check for specific CFS inquiries
    if (text.includes('which cfs') || text.includes('what cfs') ||
        (text.includes('cfs') && text.includes('recommend')) ||
        (text.includes('best') && text.includes('cfs'))) {
      return "We have several excellent CFS facilities. Here are our top-rated options:\n\n" +
             "1. Gateway Distriparks Limited (Mumbai) - Rating: 4.8/5\n" +
             "2. EverCFS (Mumbai Port) - Rating: 4.8/5\n" +
             "3. GreenLogix (Chennai Port) - Rating: 4.5/5\n\n" +
             "Which one would you like to know more about?";
    }

    // Check for specific CFS details
    const cfsKeywords = {
      "gateway": ["gateway", "distriparks", "mumbai cfs", "nhava sheva"],
      "chennai icd": ["chennai icd", "chennai container", "chennai depot"],
      "delhi icd": ["delhi icd", "tughlakabad", "delhi container", "delhi depot"],
      "kolkata cfs": ["kolkata cfs", "kolkata container", "west bengal cfs"],
      "evercfs": ["evercfs", "ever cfs", "mumbai port cfs"],
      "greenlogix": ["greenlogix", "green logix", "chennai port cfs"],
      "swiftcargo": ["swiftcargo", "swift cargo", "jnpt cfs"]
    };

    for (const [cfsKey, keywords] of Object.entries(cfsKeywords)) {
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          return knowledgeBase[cfsKey];
        }
      }
    }

    // Check for CFS comparison request
    if ((text.includes('compare') || text.includes('difference') || text.includes('vs') || text.includes('versus')) &&
        (text.includes('cfs') || text.includes('container freight station'))) {
      return "Here's a comparison of our top CFS facilities:\n\n" +
             "Gateway Distriparks (Mumbai):\n• Rating: 4.8/5\n• Tariff: ₹5,001-10,000\n• Free Days: 7 days\n\n" +
             "Chennai ICD:\n• Rating: 4.3/5\n• Tariff: ₹10,001-15,000\n• Free Days: 10 days\n\n" +
             "Delhi ICD:\n• Rating: 4.0/5\n• Tariff: ₹0-5,000\n• Free Days: 30 days\n\n" +
             "Would you like specific details about any of these facilities?";
    }

    // Check for matches in the knowledge base
    for (const [keyword, response] of Object.entries(knowledgeBase)) {
      if (text.includes(keyword)) {
        return response;
      }
    }

    // Default response if no match is found
    return knowledgeBase.default;
  };

  // Handle sending a message
  const handleSend = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    // Check if this is a goodbye message
    const isGoodbye = input.toLowerCase().match(/bye|goodbye|see you|farewell/i);

    // Get bot response
    const botResponse = getBotReply(input);

    // Add bot message after a short delay to simulate thinking
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setLastProactiveTime(Date.now());

      // If it's a goodbye message, reset the chat after a short delay
      if (isGoodbye) {
        setTimeout(() => {
          setMessages([
            { sender: 'bot', text: '👋 Hello! I\'m your Green Ocean Logistics assistant. How can I help you today?' }
          ]);
          setIsOpen(false); // Also close the chat window
        }, 2000);
      }
    }, 500);

    setInput('');
  };

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Set up proactive messaging
  useEffect(() => {
    const proactiveInterval = setInterval(() => {
      // Show proactive message every 15 seconds if the chat isn't open
      const currentTime = Date.now();
      if (!isOpen && currentTime - lastProactiveTime > 15 * 1000) {
        // Show a temporary notification without opening the full chat
        const proactiveMessages = [
          "Are you facing any difficulties with your logistics needs? I'm here to help!",
          "Need assistance with shipping, tracking, or any other logistics service? Just ask me!",
          "Looking for information about our services? I can provide details on all Green Ocean Logistics offerings.",
          "Do you have questions about our EIR/COP, invoicing, or container services? I'm here to assist you!"
        ];

        const randomMessage = proactiveMessages[Math.floor(Math.random() * proactiveMessages.length)];

        // Create and show a temporary notification
        const notification = document.createElement('div');
        notification.className = 'chatbot-notification';
        notification.innerHTML = `
          <div class="notification-content">
            <p>${randomMessage}</p>
            <div class="notification-buttons">
              <button class="notification-yes">Yes, I need help</button>
              <button class="notification-no">No, thanks</button>
            </div>
          </div>
        `;

        document.body.appendChild(notification);

        // Add event listeners to the buttons
        const yesButton = notification.querySelector('.notification-yes');
        const noButton = notification.querySelector('.notification-no');

        yesButton.addEventListener('click', () => {
          setIsOpen(true);
          document.body.removeChild(notification);
        });

        noButton.addEventListener('click', () => {
          document.body.removeChild(notification);
        });

        // Auto-remove the notification after 10 seconds if no action is taken
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 10000);

        setLastProactiveTime(currentTime);
      }
    }, 15 * 1000); // Check every 15 seconds

    return () => clearInterval(proactiveInterval);
  }, [isOpen, lastProactiveTime]);

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <button
          className="chatbot-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      ) : (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Green Ocean Logistics Assistant</span>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === 'bot' ? 'bot-message' : 'user-message'}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about our logistics services..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}