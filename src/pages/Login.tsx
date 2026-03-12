import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login - replace with real auth when backend is connected
    setTimeout(() => {
      if (email && password) {
        toast({ title: 'Login successful', description: 'Welcome to PeaceGuard AI' });
        navigate('/');
      } else {
        toast({ title: 'Login failed', description: 'Please enter valid credentials', variant: 'destructive' });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground">PeaceGuard AI</h1>
            <p className="text-sm text-muted-foreground mt-1">Conflict Early Warning System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-foreground mb-1.5 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="analyst@peaceguard.ke"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10 bg-secondary/50 border-border"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-foreground mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-secondary/50 border-border"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-border" />
                Remember me
              </label>
              <a href="#" className="text-primary hover:underline">Forgot password?</a>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2"><LogIn className="w-4 h-4" /> Sign In</span>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Access restricted to authorized personnel only.
              <br />Contact your administrator for access.
            </p>
          </div>
        </div>

        {/* Role info */}
        <div className="mt-4 glass-card p-4">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Demo Access Roles:</p>
          <div className="grid grid-cols-3 gap-2 text-[10px]">
            <div className="bg-secondary/50 rounded p-2 text-center">
              <p className="text-foreground font-medium">Admin</p>
              <p className="text-muted-foreground">Full access</p>
            </div>
            <div className="bg-secondary/50 rounded p-2 text-center">
              <p className="text-foreground font-medium">Analyst</p>
              <p className="text-muted-foreground">View & analyze</p>
            </div>
            <div className="bg-secondary/50 rounded p-2 text-center">
              <p className="text-foreground font-medium">Observer</p>
              <p className="text-muted-foreground">View only</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
