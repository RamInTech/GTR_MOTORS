import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto bg-black/50 backdrop-blur-md border-white/10 text-white shadow-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-white">My Account</CardTitle>
          <CardDescription className="text-gray-400">
            Manage your personal information and settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
                <Input id="firstName" defaultValue="John" className="bg-white/5 border-white/10 text-white focus:border-red-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" className="bg-white/5 border-white/10 text-white focus:border-red-500 transition-colors" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@example.com" className="bg-white/5 border-white/10 text-white focus:border-red-500 transition-colors" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Change Password</Label>
              <Input id="password" type="password" placeholder="New Password" className="bg-white/5 border-white/10 text-white focus:border-red-500 transition-colors" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm New Password" className="bg-white/5 border-white/10 text-white focus:border-red-500 transition-colors" />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
