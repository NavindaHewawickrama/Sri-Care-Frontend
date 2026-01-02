import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { mockBills } from './mockData';

export function BillsPage() {
  const downloadBill = (billId: string) => {
    // Mock download
    alert(`Downloading bill ${billId}...`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2">Bills</h2>
        <p className="text-gray-600">View and manage your billing history</p>
      </div>

      {/* Current Bill Highlight */}
      <Card className="border-blue-500 bg-blue-50">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Current Bill - {mockBills[0].month}</CardTitle>
              <CardDescription className="mt-2">
                Due Date: {new Date(mockBills[0].dueDate).toLocaleDateString()}
              </CardDescription>
            </div>
            <Badge variant={mockBills[0].status === 'Paid' ? 'default' : 'destructive'}>
              {mockBills[0].status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-4xl">LKR {mockBills[0].amount.toLocaleString()}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm mb-2">Services Included:</p>
              <div className="flex flex-wrap gap-2">
                {mockBills[0].services.map((service, index) => (
                  <Badge key={index} variant="outline">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              {mockBills[0].status !== 'Paid' && (
                <Link to="/payments" className="flex-1">
                  <Button className="w-full">Pay Now</Button>
                </Link>
              )}
              <Button
                variant="outline"
                onClick={() => downloadBill(mockBills[0].id)}
              >
                Download PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past bills and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBills.map((bill) => (
              <div key={bill.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-lg">{bill.month}</p>
                    <p className="text-sm text-gray-500">
                      Due: {new Date(bill.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl">LKR {bill.amount.toLocaleString()}</p>
                    <Badge variant={bill.status === 'Paid' ? 'default' : 'destructive'} className="mt-1">
                      {bill.status}
                    </Badge>
                  </div>
                </div>
                <Separator className="my-3" />
                <div className="flex flex-wrap gap-2 mb-3">
                  {bill.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadBill(bill.id)}
                  >
                    Download PDF
                  </Button>
                  {bill.status !== 'Paid' && (
                    <Link to="/payments">
                      <Button size="sm">Pay Now</Button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bill Details Info */}
      <Card>
        <CardHeader>
          <CardTitle>Understanding Your Bill</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-2 text-gray-600">
          <p>• Bills are generated on the 1st of every month</p>
          <p>• Payment is due within 15 days of bill generation</p>
          <p>• Late payments may result in service suspension</p>
          <p>• You will receive email and SMS alerts when your bill is ready</p>
          <p>• Disputed charges can be reported through customer support</p>
        </CardContent>
      </Card>
    </div>
  );
}
