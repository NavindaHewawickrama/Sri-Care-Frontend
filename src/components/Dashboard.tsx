import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress.tsx';
import { Button } from './ui/button';
import { mockBills, mockUsageData, mockServices } from './mockData';


export function Dashboard() {
  const currentBill = mockBills[0];
  const activeServices = mockServices.filter(s => s.active);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2">Dashboard</h2>
        <p className="text-gray-600">Welcome to your Sri-Care portal</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-500">Current Bill</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">LKR {currentBill.amount.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">Due: {new Date(currentBill.dueDate).toLocaleDateString()}</p>
            <Link to="/payments">
              <Button className="w-full mt-4" size="sm">
                Pay Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-500">Active Services</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">{activeServices.length}</p>
            <p className="text-sm text-gray-500 mt-1">
              Total: LKR {activeServices.reduce((sum, s) => sum + s.monthlyFee, 0)} /month
            </p>
            <Link to="/services">
              <Button variant="outline" className="w-full mt-4" size="sm">
                Manage Services
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-500">Data Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">
              {mockUsageData.data.used} / {mockUsageData.data.total} GB
            </p>
            <Progress 
              value={(mockUsageData.data.used / mockUsageData.data.total) * 100} 
              className="mt-2"
            />
            <p className="text-sm text-gray-500 mt-2">
              {Math.round((mockUsageData.data.used / mockUsageData.data.total) * 100)}% used
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Details */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Voice Minutes</span>
              <span className="text-sm">{mockUsageData.voice.used} / {mockUsageData.voice.total}</span>
            </div>
            <Progress value={(mockUsageData.voice.used / mockUsageData.voice.total) * 100} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Data</span>
              <span className="text-sm">{mockUsageData.data.used} / {mockUsageData.data.total} GB</span>
            </div>
            <Progress value={(mockUsageData.data.used / mockUsageData.data.total) * 100} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">SMS Messages</span>
              <span className="text-sm">{mockUsageData.sms.used} / {mockUsageData.sms.total}</span>
            </div>
            <Progress value={(mockUsageData.sms.used / mockUsageData.sms.total) * 100} />
          </div>
        </CardContent>
      </Card>

      {/* Recent Bills */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Bills</CardTitle>
          <Link to="/bills">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBills.slice(0, 3).map((bill) => (
              <div key={bill.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                <div>
                  <p>{bill.month}</p>
                  <p className="text-sm text-gray-500">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p>LKR {bill.amount.toLocaleString()}</p>
                  <p className={`text-sm ${bill.status === 'Paid' ? 'text-green-600' : 'text-orange-600'}`}>
                    {bill.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/services">
              <Button variant="outline" className="w-full h-20 flex-col">
                <span className="text-2xl mb-1">⚙️</span>
                <span className="text-xs">Manage Services</span>
              </Button>
            </Link>
            <Link to="/payments">
              <Button variant="outline" className="w-full h-20 flex-col">
                <span className="text-2xl mb-1">💳</span>
                <span className="text-xs">Pay Bill</span>
              </Button>
            </Link>
            <Link to="/bills">
              <Button variant="outline" className="w-full h-20 flex-col">
                <span className="text-2xl mb-1">📄</span>
                <span className="text-xs">View Bills</span>
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="outline" className="w-full h-20 flex-col">
                <span className="text-2xl mb-1">👤</span>
                <span className="text-xs">Profile</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
