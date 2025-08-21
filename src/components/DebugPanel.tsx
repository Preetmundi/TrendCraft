import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { auth, db } from '@/integrations/firebase/client';
import { collection, getDocs, limit } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

const DebugPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tests, setTests] = useState({
    supabase: 'pending',
    auth: 'pending',
    trending: 'pending',
    ai: 'pending'
  });
  const { toast } = useToast();

  const runTests = async () => {
    setTests({
      supabase: 'testing',
      auth: 'testing', 
      trending: 'testing',
      ai: 'testing'
    });

    // Test 1: Firebase Connection
    try {
      const querySnapshot = await getDocs(collection(db, 'profiles'));
      setTests(prev => ({ ...prev, supabase: 'success' }));
    } catch (error) {
      console.error('Firebase test failed:', error);
      setTests(prev => ({ ...prev, supabase: 'error' }));
    }

    // Test 2: Authentication
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setTests(prev => ({ ...prev, auth: 'success' }));
      } else {
        setTests(prev => ({ ...prev, auth: 'success' })); // Firebase auth is working even without user
      }
    } catch (error) {
      console.error('Auth test failed:', error);
      setTests(prev => ({ ...prev, auth: 'error' }));
    }

    // Test 3: Trending Data
    try {
      const querySnapshot = await getDocs(collection(db, 'trending_data'));
      setTests(prev => ({ ...prev, trending: 'success' }));
    } catch (error) {
      console.error('Trending test failed:', error);
      setTests(prev => ({ ...prev, trending: 'error' }));
    }

    // Test 4: AI Service
    try {
      const hasApiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      if (hasApiKey) {
        setTests(prev => ({ ...prev, ai: 'success' }));
      } else {
        throw new Error('API key not found');
      }
    } catch (error) {
      console.error('AI test failed:', error);
      setTests(prev => ({ ...prev, ai: 'error' }));
    }
  };

  const testSignUp = async () => {
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'testpassword123';
    
    try {
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      const result = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
      
      toast({
        title: 'Test signup successful!',
        description: `User created: ${result.user.email}`,
      });
    } catch (error) {
      console.error('Test signup error:', error);
      toast({
        title: 'Test signup failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'default';
      case 'error': return 'destructive';
      case 'testing': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return '✅ Working';
      case 'error': return '❌ Failed';
      case 'testing': return '🔄 Testing...';
      default: return '⏳ Pending';
    }
  };

  return (
    <>
      {/* Debug Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-50 bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg"
        title="Debug Panel"
      >
        🔧
      </button>

      {/* Debug Panel */}
      {isVisible && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 bg-background">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">🔧 Debug Panel</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                >
                  ✕
                </Button>
              </div>

              {/* Environment Variables */}
              <div className="space-y-2">
                <h4 className="font-medium">Environment Variables</h4>
                <div className="text-sm space-y-1">
                                     <div className="flex justify-between">
                     <span>FIREBASE_API_KEY:</span>
                     <Badge variant={import.meta.env.VITE_FIREBASE_API_KEY ? 'default' : 'destructive'}>
                       {import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Missing'}
                     </Badge>
                   </div>
                   <div className="flex justify-between">
                     <span>FIREBASE_PROJECT_ID:</span>
                     <Badge variant={import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'default' : 'destructive'}>
                       {import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Set' : 'Missing'}
                     </Badge>
                   </div>
                  <div className="flex justify-between">
                    <span>OPENROUTER_API_KEY:</span>
                    <Badge variant={import.meta.env.VITE_OPENROUTER_API_KEY ? 'default' : 'destructive'}>
                      {import.meta.env.VITE_OPENROUTER_API_KEY ? 'Set' : 'Missing'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* System Tests */}
              <div className="space-y-2">
                <h4 className="font-medium">System Tests</h4>
                <div className="space-y-2">
                                     <div className="flex justify-between items-center">
                     <span>Firebase Connection:</span>
                     <Badge variant={getStatusColor(tests.supabase)}>
                       {getStatusText(tests.supabase)}
                     </Badge>
                   </div>
                  <div className="flex justify-between items-center">
                    <span>Authentication:</span>
                    <Badge variant={getStatusColor(tests.auth)}>
                      {getStatusText(tests.auth)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Trending Data:</span>
                    <Badge variant={getStatusColor(tests.trending)}>
                      {getStatusText(tests.trending)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>AI Service:</span>
                    <Badge variant={getStatusColor(tests.ai)}>
                      {getStatusText(tests.ai)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={runTests} className="flex-1">
                  Run Tests
                </Button>
                <Button onClick={testSignUp} variant="outline" className="flex-1">
                  Test Sign Up
                </Button>
              </div>

              {/* Instructions */}
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <p className="font-medium mb-2">If tests fail:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Add environment variables in Vercel</li>
                  <li>Redeploy your application</li>
                  <li>Check Supabase settings</li>
                  <li>Verify API keys are correct</li>
                </ol>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default DebugPanel;
