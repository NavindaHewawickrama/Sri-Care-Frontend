import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { mockNotifications as initialNotifications } from './mockData';

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [preferences, setPreferences] = useState({
    email: true,
    sms: true,
    push: true,
    billAlerts: true,
    paymentAlerts: true,
    serviceAlerts: true,
    usageAlerts: true,
  });

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'bill':
        return '📄';
      case 'payment':
        return '💳';
      case 'usage':
        return '📊';
      case 'service':
        return '⚙️';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'bill':
        return 'border-blue-200 bg-blue-50';
      case 'payment':
        return 'border-green-200 bg-green-50';
      case 'usage':
        return 'border-orange-200 bg-orange-50';
      case 'service':
        return 'border-purple-200 bg-purple-50';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl mb-2">Notifications</h2>
          <p className="text-gray-600">Stay updated with your account activities</p>
        </div>
        {notifications.some(n => !n.read) && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          {notifications.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-gray-500">
                <p className="text-4xl mb-4">🔔</p>
                <p>No notifications yet</p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`${!notification.read ? 'border-l-4 border-l-blue-500' : ''} ${
                  getNotificationColor(notification.type)
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="text-3xl">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <Badge variant="destructive" className="text-xs">New</Badge>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(notification.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{notification.message}</p>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Notification Preferences */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm mb-4">Channels</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email" className="cursor-pointer">Email Notifications</Label>
                    <Switch
                      id="email"
                      checked={preferences.email}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, email: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms" className="cursor-pointer">SMS Notifications</Label>
                    <Switch
                      id="sms"
                      checked={preferences.sms}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, sms: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push" className="cursor-pointer">Push Notifications</Label>
                    <Switch
                      id="push"
                      checked={preferences.push}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, push: checked })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm mb-4">Alert Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="billAlerts" className="cursor-pointer">Bill Alerts</Label>
                    <Switch
                      id="billAlerts"
                      checked={preferences.billAlerts}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, billAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="paymentAlerts" className="cursor-pointer">Payment Alerts</Label>
                    <Switch
                      id="paymentAlerts"
                      checked={preferences.paymentAlerts}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, paymentAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="serviceAlerts" className="cursor-pointer">Service Alerts</Label>
                    <Switch
                      id="serviceAlerts"
                      checked={preferences.serviceAlerts}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, serviceAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="usageAlerts" className="cursor-pointer">Usage Alerts</Label>
                    <Switch
                      id="usageAlerts"
                      checked={preferences.usageAlerts}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, usageAlerts: checked })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="text-xs text-gray-600 space-y-1">
                <p>💡 Tip: Keep bill and payment alerts enabled to avoid service disruptions</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
