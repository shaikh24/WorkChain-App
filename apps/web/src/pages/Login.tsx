import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../lib/auth';
import { useToast } from '../components/Toaster';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { push } = useToast();
  async function onSubmit(){
    try{ await login(email, password); push({ title: 'Logged in' }); }
    catch(e:any){ push({ title: 'Login failed', description: e?.response?.data?.error || 'Error' }); }
  }
  return (
    <div className="max-w-sm mx-auto p-6">
      <Card className="space-y-3">
        <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <Button onClick={onSubmit}>Login</Button>
      </Card>
    </div>
  );
}
