
import { useState } from "react";
import { X, Phone, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface EmergencyHotlineProps {
  onClose: () => void;
}

const EmergencyHotline = ({ onClose }: EmergencyHotlineProps) => {
  const [calling, setCalling] = useState(false);
  const [callTime, setCallTime] = useState(0);
  
  const simulateCall = () => {
    setCalling(true);
    toast.success("Connecting to mental health professional...");
    
    // Simulate call timer
    const timer = setInterval(() => {
      setCallTime(prev => prev + 1);
    }, 1000);
    
    // Auto end call after 15 seconds
    setTimeout(() => {
      clearInterval(timer);
      setCalling(false);
      setCallTime(0);
      toast.info("Call ended. Help is always available when you need it.");
    }, 15000);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-scale-in">
        <div className="bg-gradient-to-r from-violet-700 to-fuchsia-700 dark:from-violet-900 dark:to-fuchsia-900 p-4 flex justify-between items-center">
          <h2 className="text-white text-xl font-bold">Mental Health Emergency Line</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="text-white hover:bg-white/20 rounded-full"
            disabled={calling}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6">
          {calling ? (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mx-auto flex items-center justify-center animate-pulse">
                <Phone className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-lg font-medium">Call in progress</p>
              <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>{formatTime(callTime)}</span>
              </div>
              <Button 
                variant="destructive" 
                className="mt-4 rounded-full px-6"
                onClick={() => {
                  setCalling(false);
                  setCallTime(0);
                  toast.info("Call ended");
                }}
              >
                End Call
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  If you're experiencing a mental health emergency, please call our 24/7 hotline or send a message.
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Our trained professionals are ready to provide immediate assistance.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-auto py-6 flex flex-col items-center space-y-3 shadow-lg"
                  onClick={simulateCall}
                >
                  <Phone className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-bold">Call Now</div>
                    <div className="text-xs text-white/80">Toll Free: 116</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-6 flex flex-col items-center space-y-3 border-2"
                  onClick={() => toast.success("Message sent! A counselor will respond shortly.")}
                >
                  <MessageSquare className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-bold">Text Message</div>
                    <div className="text-xs opacity-80">Send "HELP" to 5011</div>
                  </div>
                </Button>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 rounded-lg p-4 text-center text-amber-800 dark:text-amber-300 text-sm">
                <p className="font-medium">In case of immediate danger, please call emergency services at 112</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900 p-4 text-center border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Zambia Mind Wellbeing Hub is here to help 24/7
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHotline;
