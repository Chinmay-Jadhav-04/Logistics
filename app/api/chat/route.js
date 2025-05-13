import { NextResponse } from 'next/server';

// Simple knowledge base for logistics-related questions
const knowledgeBase = {
    // Company information
    "company": "Green Ocean Logistics (GOL) is a leading global logistics provider offering comprehensive supply chain solutions. We specialize in freight forwarding, warehousing, customs clearance, and specialized logistics services.",
    "about": "Green Ocean Logistics was founded in 2005 and has grown to serve over 10,000 clients worldwide with operations in 45 countries. Our mission is to provide sustainable, efficient, and reliable logistics solutions.",
    "contact": "You can reach our customer service team at support@greenoceanlogistics.com or call our 24/7 hotline at +1-800-LOG-ISTI. Our headquarters is located in Singapore with regional offices across Asia, Europe, and the Americas.",
    "services": "Our core services include international freight forwarding (air, sea, and land), warehousing and distribution, customs brokerage, project logistics, and supply chain consulting.",
    "shipping": "We offer various shipping options including air freight, sea freight, and land transport. Our global network ensures timely delivery to over 150 countries.",
    "tracking": "You can track your shipment using the tracking number provided in your confirmation email. Simply enter it on our tracking page or contact customer support.",
    "pricing": "Our pricing is competitive and based on weight, dimensions, destination, and service level. For a detailed quote, please provide your shipment details.",
    "customs": "We handle all customs documentation and clearance procedures. Our experts ensure compliance with international regulations to avoid delays.",
    "packaging": "We recommend using sturdy boxes with appropriate cushioning materials. For fragile items, double-boxing provides extra protection.",
    "insurance": "Shipment insurance is available for all packages. The cost is typically 1-5% of the declared value, depending on the goods and destination.",
    "delivery time": "Delivery times vary by service and destination. Express services typically take 1-3 business days, while standard services may take 5-10 business days.",
    "returns": "We offer hassle-free return logistics solutions. Contact our customer service to arrange pickup and return of your items.",
    "warehousing": "Our warehousing solutions include storage, inventory management, order fulfillment, and distribution services.",
    "documentation": "Required documents typically include commercial invoice, packing list, bill of lading or airway bill, and certificates of origin when applicable.",
    "restrictions": "Certain items are restricted or prohibited for shipping, including hazardous materials, perishables, and items prohibited by law in destination countries.",
    "sustainability": "We're committed to sustainable logistics with carbon-neutral shipping options, eco-friendly packaging, and optimized routes to reduce emissions.",
    "cfs-icd": "Our Container Freight Station (CFS) and Inland Container Depot (ICD) services provide efficient container handling, storage, and distribution.",
    "bonded warehouse": "Our bonded warehouses allow storage of goods without payment of duties and taxes until they're released for domestic consumption or re-exported.",
    "3pl": "As a Third-Party Logistics (3PL) provider, we offer integrated logistics services including transportation, warehousing, and fulfillment.",
    "help": "I can answer questions about shipping, tracking, pricing, customs, packaging, insurance, delivery times, returns, warehousing, documentation, restrictions, and our sustainability initiatives."
};

export async function POST(request) {
    try {
        // Parse the request body
        const { messages } = await request.json();

        // Get the last user message
        const userMessage = messages[messages.length - 1].content.toLowerCase();

        // Generate a response based on the user's query
        let responseContent = generateResponse(userMessage);

        // Return the response
        return NextResponse.json({
            role: "assistant",
            content: responseContent
        });

        // Function to generate a response based on the user's query
        function generateResponse(query) {
            // Default response if no match is found
            let response = "I'm a logistics assistant for Green Ocean Logistics. I can help with questions about shipping, tracking, customs, warehousing, and other logistics services. How can I assist you today?";

            // Check for greetings
            if (query.match(/^(hi|hello|hey|greetings|howdy)/i)) {
                return "Hello! I'm your Green Ocean Logistics assistant. How can I help you with your logistics needs today?";
            }

            // Check for thank you
            if (query.match(/thank you|thanks|thx/i)) {
                return "You're welcome! Is there anything else I can help you with regarding your logistics needs?";
            }

            // Check for goodbye
            if (query.match(/bye|goodbye|see you|farewell/i)) {
                return "Goodbye! Feel free to return if you have more questions about Green Ocean Logistics services.";
            }

            // Check for help request
            if (query.match(/help|assist|support/i)) {
                return knowledgeBase["help"];
            }

            // Check for matches in the knowledge base
            for (const [keyword, info] of Object.entries(knowledgeBase)) {
                if (query.includes(keyword)) {
                    response = info;
                    break;
                }
            }

            // Check for specific service inquiries
            if (query.includes("land transport") || query.includes("road freight")) {
                return "Our Land Transport services offer reliable and cost-effective road freight solutions across domestic and cross-border routes. We provide FTL (Full Truck Load) and LTL (Less than Truck Load) options with real-time tracking and flexible scheduling.";
            }

            if (query.includes("air freight") || query.includes("air cargo")) {
                return "Our Air Freight services provide fast and reliable global air cargo solutions. We offer standard, express, and charter options with door-to-door delivery, customs clearance, and specialized handling for time-sensitive shipments.";
            }

            if (query.includes("sea freight") || query.includes("ocean freight")) {
                return "Our Sea Freight services include FCL (Full Container Load) and LCL (Less than Container Load) options for global ocean shipping. We provide competitive rates, reliable schedules, and end-to-end visibility for your maritime logistics needs.";
            }

            return response;
        }
    } catch (error) {
        console.error("Error in Logistics AI:", error);

        // Generic error response
        return NextResponse.json({
            role: "assistant",
            content: "I apologize, but I encountered an error processing your request. Please try again with a different question about our logistics services."
        }, { status: 200 });
    }
}
