import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../lib/auth';
import { useToast } from '../components/Toaster';

export default function Register(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client'|'freelancer'>('client');
  const { register } = useAuth();
  const { push } = useToast();
  async function onSubmit(){
    try{ await register(email, password, role); push({ title: 'Registered' }); }
    catch(e:any){ push({ title: 'Register failed', description: e?.response?.data?.error || 'Error' }); }
  }
  return (
    <div className="max-w-sm mx-auto p-6">
      <Card className="space-y-3">
        <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="text-sm">Role: 
          <select value={role} onChange={e=>setRole(e.target.value as any)} className="ml-2 border rounded px-2 py-1">
            <option value="client">Client</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </div>
        <Button onClick={onSubmit}>Register</Button>
      </Card>
    </div>
  );
}
