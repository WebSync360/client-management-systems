import { 
  User, 
  Shield, 
  Bell, 
  Globe, 
  Key, 
  Save,
  Database
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SystemSettings() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-3 duration-700">
      
      {/* HEADER: Institutional & Calm */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-100 pb-8">
        <div>
          <Badge variant="outline" className="mb-3 border-brand-200 text-brand-700 uppercase tracking-[0.2em] text-[9px] font-black">
            System Configuration
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary">Settings</h1>
          <p className="text-text-muted mt-2">Manage your workspace parameters and security protocols.</p>
        </div>
        <Button className="bg-brand-900 hover:bg-black text-white px-6 gap-2 shadow-lg shadow-brand-900/10">
          <Save className="h-4 w-4" />
          Commit Changes....
        </Button>
      </div>

      {/* THE CONTROL GRID */}
      <Tabs defaultValue="profile" className="flex flex-col lg:flex-row gap-10">
        
        {/* TAB NAVIGATION: Sidebar Style */}
        <TabsList className="flex flex-row lg:flex-col h-auto bg-transparent gap-2 p-0 lg:w-64">
          {[
            { id: "profile", label: "Identity", icon: User },
            { id: "security", label: "Security", icon: Shield },
            { id: "notifications", label: "Alerts", icon: Bell },
            { id: "system", label: "Environment", icon: Database },
            { id: "api", label: "API Keys", icon: Key },
          ].map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center justify-start gap-3 w-full px-4 py-3 text-sm font-bold tracking-tight data-[state=active]:bg-white data-[state=active]:shadow-soft data-[state=active]:text-brand-900 rounded-xl transition-all"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* CONTENT AREA */}
        <div className="flex-1 max-w-3xl">
          
          {/* IDENTITY TAB */}
          <TabsContent value="profile" className="mt-0 space-y-6">
            <Card className="border-none shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Workspace Identity</CardTitle>
                <CardDescription>Update your public-facing operational details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-text-muted tracking-widest">Full Name</label>
                    <input type="text" className="w-full p-3 rounded-xl border border-brand-100 bg-slate-50/50 focus:ring-2 ring-brand-500/20 outline-none transition-all text-sm font-medium" defaultValue="Dev Blaze" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-text-muted tracking-widest">Title</label>
                    <input type="text" className="w-full p-3 rounded-xl border border-brand-100 bg-slate-50/50 focus:ring-2 ring-brand-500/20 outline-none transition-all text-sm font-medium" defaultValue="Systems Architect" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-muted tracking-widest">Operational Email</label>
                  <input type="email" className="w-full p-3 rounded-xl border border-brand-100 bg-slate-50/50 text-sm font-medium" defaultValue="admin@ops-os.enterprise" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Localization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-xl bg-brand-50/50 border border-brand-100">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-brand-600" />
                    <div>
                      <p className="text-sm font-bold text-brand-900">System Timezone</p>
                      <p className="text-xs text-brand-600">Currently set to UTC+1 (Lagos)</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-xs font-bold uppercase text-brand-600">Modify</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECURITY TAB (SKELETON) */}
          <TabsContent value="security" className="mt-0">
             <Card className="border-none shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Authentication Protocols</CardTitle>
                <CardDescription>Two-factor authentication and session management.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center justify-between py-4 border-b border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-text-primary">Multi-Factor Authentication</p>
                      <p className="text-xs text-text-muted">Secure your account with TOTP tokens.</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Active</Badge>
                 </div>
                 <Button variant="outline" className="w-full border-brand-200 text-brand-700 hover:bg-brand-50">Rotate Security Keys</Button>
              </CardContent>
            </Card>
          </TabsContent>

        </div>
      </Tabs>
    </div>
  );
}