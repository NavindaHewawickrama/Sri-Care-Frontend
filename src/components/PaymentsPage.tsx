import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select.tsx';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { toast } from 'sonner';
import { mockBills } from './mockData';

export function PaymentsPage() {
  const [selectedBill, setSelectedBill] = useState(mockBills[0].id);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const unpaidBills = mockBills.filter(b => b.status !== 'Paid');
  const selectedBillData = mockBills.find(b => b.id === selectedBill);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock payment processing
    toast.success('Payment processed successfully!', {
      description: `LKR ${selectedBillData?.amount.toLocaleString()} paid for ${selectedBillData?.month}`,
    });
    
    // Reset form
    setCardDetails({
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2">Payments</h2>
        <p className="text-gray-600">Pay your bills securely online</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Make a Payment</CardTitle>
              <CardDescription>Select a bill and complete payment securely</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Bill Selection */}
                <div className="space-y-2">
                  <Label>Select Bill to Pay</Label>
                  <Select value={selectedBill} onValueChange={setSelectedBill}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {unpaidBills.length > 0 ? (
                        unpaidBills.map(bill => (
                          <SelectItem key={bill.id} value={bill.id}>
                            {bill.month} - LKR {bill.amount.toLocaleString()}
                          </SelectItem>
                        ))
                      ) : (
                        mockBills.map(bill => (
                          <SelectItem key={bill.id} value={bill.id}>
                            {bill.month} - LKR {bill.amount.toLocaleString()}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Payment Method */}
                <div className="space-y-3">
                  <Label>Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="cursor-pointer">
                        Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="cursor-pointer">
                        Bank Transfer
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {paymentMethod === 'card' && (
                  <>
                    <Separator />

                    {/* Card Details */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                          maxLength={19}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={cardDetails.cardName}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={cardDetails.expiryDate}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                            maxLength={5}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="password"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod === 'bank' && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm">
                      Bank transfer details will be sent to your registered email address.
                      Payment will be processed within 1-2 business days.
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg">
                  Pay LKR {selectedBillData?.amount.toLocaleString()}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedBillData && (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Billing Period</p>
                    <p>{selectedBillData.month}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Due Date</p>
                    <p>{new Date(selectedBillData.dueDate).toLocaleDateString()}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Services</p>
                    <div className="space-y-1">
                      {selectedBillData.services.map((service, index) => (
                        <p key={index} className="text-sm">• {service}</p>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-3xl">LKR {selectedBillData.amount.toLocaleString()}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-sm">Secure Payment</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-gray-600 space-y-2">
              <p>🔒 Your payment is secure and encrypted</p>
              <p>💳 We accept Visa, Mastercard, and Amex</p>
              <p>✅ Instant payment confirmation</p>
              <p>📧 Receipt will be emailed to you</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
