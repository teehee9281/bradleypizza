import { useState } from 'react';
import { MessageCircle, X, Send, Phone } from 'lucide-react';

const MENU = {
  Pizza: [
    ["Large Pie Special", "$12.99"],
    ["Cheesesteak Pie", "$16.99 – $30.00"],
    ["Chicken Francese Pie", "$16.00 – $30.00"],
    ["Chicken Marsala Pie", "$16.00 – $30.00"],
    ["Meatlover Pie", "$16.00 – $30.00"],
    ["Everything Pie", "$15.00 – $30.00"],
    ["Clam Red or White", "$14.00 – $28.00"],
    ["Chicken & Broccoli Alfredo", "$16.00 – $28.00"],
  ],
  Appetizers: [
    ["Garlic Bread", "$6.99"],
    ["Garlic Bread w/ Cheese", "$7.99"],
    ["Garlic Knots (6)", "$5.00"],
    ["Mozzarella Sticks (6)", "$9.99"],
    ["Fried Calamari", "$14.99"],
    ["Chicken Fingers (6)", "$11.99"],
    ["Chicken Fingers w/ Fries", "$13.99"],
    ["Wings (8)", "$13.99"],
    ["French Fries", "$6.99"],
    ["Waffle Fries", "$7.99"],
  ],
  Wraps: [
    ["Grilled Chicken Wrap", "$16.99"],
    ["Buffalo Wrap", "$16.99"],
    ["Crispy Chicken Wrap", "$16.99"],
    ["Philly Steak Wrap", "$16.99"],
    ["Caesar Wrap", "$16.99"],
    ["Veggie Wrap", "$16.99"],
    ["Vodka Wrap", "$16.99"],
    ["Delafield Wrap", "$16.99"],
  ],
  Salads: [
    ["Tossed Salad", "$11.99"],
    ["Caesar Salad", "$11.99"],
    ["Tossed w/ Grilled Chicken", "$16.99"],
    ["Caesar w/ Grilled Chicken", "$16.99"],
    ["Antipasto Salad", "$16.99"],
    ["Chef Salad", "$16.99"],
    ["Strawberry & Walnut", "$13.99"],
    ["Caesar w/ Shrimp", "$17.99"],
  ],
  "Lunch Specials": [
    ["Chicken Parmigiana Hero", "$12.99"],
    ["Eggplant Parm Hero", "$12.99"],
    ["Meatball Parm Hero", "$12.99"],
    ["Sausage & Peppers Hero", "$12.99"],
    ["Spaghetti & Meatballs", "$12.99"],
    ["Penne Vodka", "$12.99"],
    ["Baked Ziti", "$12.99"],
    ["Lasagna", "$12.99"],
  ],
  "Dinner Specials": [
    ["Chicken Parm w/ Ziti", "$16.99"],
    ["Spaghetti & Meatballs", "$15.99"],
    ["Baby Shrimp w/ Linguine", "$16.99"],
    ["Grilled Chicken w/ Broccoli & Rigatoni", "$14.99"],
    ["Stuffed Shells (6)", "$13.99"],
    ["Penne Vodka", "$13.99"],
    ["Eggplant Parm w/ Penne", "$12.95"],
  ],
  Seafood: [
    ["Super Delafield Platter", "$23.99"],
    ["Shrimp Parmigiana", "$22.99"],
    ["Linguini w/ Clam Sauce", "$19.99"],
    ["Calamari Linguini", "$19.99"],
  ],
  Desserts: [
    ["Zeppoles (6)", "$5.00"],
    ["Zeppoles w/ Cinnamon", "$5.00"],
    ["Chocolate Mousse Cake", "$7.00"],
  ],
};

interface Message {
  text: string;
  isUser: boolean;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm Bradley Pizza's assistant. How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = useState('');

  const findMenuItem = (query: string): { name: string; price: string; quantity?: string } | null => {
    const lowerQuery = query.toLowerCase();
    const queryWords = lowerQuery.split(' ').filter(word => word.length > 2);
    
    let bestMatch: { name: string; price: string; quantity?: string } | null = null;
    let bestMatchScore = 0;
    let allMatches: { name: string; price: string; quantity?: string; score: number }[] = [];

    for (const [category, items] of Object.entries(MENU)) {
      for (const [name, price] of items) {
        const lowerName = name.toLowerCase();
        const nameWords = lowerName.split(' ');
        
        // Calculate match score based on word overlap
        let matchScore = 0;
        let exactMatches = 0;
        
        for (const queryWord of queryWords) {
          for (const nameWord of nameWords) {
            if (nameWord === queryWord) {
              matchScore += 3; // Exact word match - higher weight
              exactMatches++;
            } else if (nameWord.includes(queryWord)) {
              matchScore += 1; // Partial match (name contains query word)
            } else if (queryWord.includes(nameWord)) {
              matchScore += 0.5; // Partial match (query word contains name word)
            }
          }
        }
        
        // Bonus for matching the full query string
        if (lowerName.includes(lowerQuery) || lowerQuery.includes(lowerName)) {
          matchScore += 2;
        }
        
        // Bonus for exact phrase match (all words in order)
        const queryPhrase = queryWords.join(' ');
        const namePhrase = nameWords.join(' ');
        if (queryPhrase === namePhrase || namePhrase.includes(queryPhrase)) {
          matchScore += 5;
        }
        
        // Penalty for very short queries that could match many things
        if (queryWords.length < 2 && exactMatches < 2) {
          matchScore *= 0.5;
        }
        
        // Collect all potential matches
        if (matchScore >= 3) {
          const quantityMatch = name.match(/\((\d+)\)/);
          const quantity = quantityMatch ? quantityMatch[1] : undefined;
          allMatches.push({ name, price, quantity, score: matchScore });
        }
      }
    }
    
    // Sort by score and return the best match
    allMatches.sort((a, b) => b.score - a.score);
    
    if (allMatches.length > 0) {
      // If there are multiple matches with similar scores, return the first one
      // The improved scoring should distinguish better between similar items
      return allMatches[0];
    }
    
    return null;
  };

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Handle greetings (expanded)
    if (lowerMessage.match(/^(hello|hi|hey|hi there|good morning|good afternoon|good evening|yo|sup|what's up|howdy|greetings)/)) {
      return "Hello! Welcome to Bradley Pizza! How can I help you today? You can ask about our menu prices, quantities, or give us a call at (718) 682-1703.";
    }
    
    // Handle thank you (expanded with abbreviations)
    if (lowerMessage.match(/(thank|thanks|thx|ty|thank you|thansk)/)) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    // Handle you're welcome responses
    if (lowerMessage.match(/(yw|you're welcome|ur welcome|no problem|no prob|np)/)) {
      return "Great! Let me know if you need anything else.";
    }
    
    // Handle goodbye (expanded)
    if (lowerMessage.match(/(bye|goodbye|see you|see ya|cya|have a good day|have a nice day|later|peace|gtg)/)) {
      return "Goodbye! Have a great day, and we hope to see you soon at Bradley Pizza!";
    }
    
    // Handle help (expanded)
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do') || lowerMessage.includes('what do you do') || lowerMessage.includes('capabilities')) {
      return "I can help you with information about our menu items, prices, and quantities. Just ask about any item like 'how much are garlic knots' or 'how many wings in an order'. For other questions, please call us at (718) 682-1703.";
    }
    
    // Handle yes/no responses
    if (lowerMessage.match(/^(yes|yeah|yep|yup|ya|sure|ok|okay|k)/)) {
      return "Great! What would you like to know about our menu?";
    }
    
    if (lowerMessage.match(/^(no|nope|nah)/)) {
      return "No problem! Let me know if you have any other questions.";
    }
    
    // Handle questions about the restaurant
    if (lowerMessage.includes('where are you') || lowerMessage.includes('location') || lowerMessage.includes('address')) {
      return "We're located at 311 Bradley Ave, Staten Island, NY 10314. You can call us at (718) 682-1703 for directions!";
    }
    
    if (lowerMessage.includes('hours') || lowerMessage.includes('open') || lowerMessage.includes('close')) {
      return "We're open Tuesday-Sunday 11:00 AM - 9:00 PM (Fri-Sat until 10:00 PM). Closed Mondays. For the most current hours, please call us at (718) 682-1703.";
    }
    
    if (lowerMessage.includes('phone') || lowerMessage.includes('call') || lowerMessage.includes('number')) {
      return "You can reach us at (718) 682-1703.";
    }
    
    // Check for quantity questions
    if (lowerMessage.includes('how many') || lowerMessage.includes('in one order') || lowerMessage.includes('quantity')) {
      const menuItem = findMenuItem(userMessage);
      if (menuItem) {
        if (menuItem.quantity) {
          return `${menuItem.name} comes with ${menuItem.quantity} pieces per order and costs ${menuItem.price}.`;
        } else {
          return `${menuItem.name} is ${menuItem.price}. For specific portion sizes, please call our store at (718) 682-1703.`;
        }
      } else {
        return "Which specific menu item are you asking about? I can help you with quantities for items like garlic knots, wings, mozzarella sticks, etc.";
      }
    }
    
    // Check for price questions
    if (lowerMessage.includes('price') || lowerMessage.includes('how much') || lowerMessage.includes('cost')) {
      const menuItem = findMenuItem(userMessage);
      if (menuItem) {
        return `${menuItem.name} is ${menuItem.price}.`;
      } else {
        return "Which menu item would you like to know the price for? Please be specific about the item name.";
      }
    }
    
    // Check for specific menu items
    const menuItem = findMenuItem(userMessage);
    if (menuItem) {
      let response = `${menuItem.name} is ${menuItem.price}.`;
      if (menuItem.quantity) {
        response += ` It comes with ${menuItem.quantity} pieces per order.`;
      }
      return response;
    }
    
    // Default response - ask for clarification
    return "I'm not sure which item you're asking about. Could you please be more specific? You can ask about prices or quantities for any menu item, or call our store at (718) 682-1703 for immediate assistance.";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
    setInput('');
    
    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = getResponse(userMessage);
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 bg-primary text-primary-foreground rounded-full p-4 shadow-[var(--shadow-warm)] hover:scale-105 transition-transform duration-200"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-[var(--shadow-warm)] flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-2xl">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">Bradley Pizza Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-primary-foreground/20 rounded transition"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <Phone className="h-3 w-3" />
              Call us at (718) 682-1703 for immediate assistance
            </p>
          </div>
        </div>
      )}
    </>
  );
}
