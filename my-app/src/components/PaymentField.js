"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import stripe from "@/utils/stripe"

export default function PaymentField({ onClose,id }) {
  const [amount, setAmount] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const {toast}=useToast()

  const handleSubmit = (event) => {
    event.preventDefault()
    // Here you would typically handle the payment submission
    fetch(`/api/projects/${id}/contributions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, isAnonymous }),
    }).then((res)=>{
      if(res.ok){
        toast({description: "Payment Succesful", variant: "success" })
        onClose()
      }else{
        toast({description: "Payment Failed", variant: "destructive" })
      }
    })

  }
  const handleStripePayment = async () => {
    try {
      const response = await stripe.createPaymentIntent({
        amount: Math.round(amount * 100),
        currency: 'usd',
      });

      const { clientSecret } = response;

      const result = await stripe.confirmCardPayment(clientSecret);

      if (result.error) {
        toast({ description: result.error.message, variant: "destructive" });
      } else if (result.paymentIntent.status === 'succeeded') {
        await fetch(`/api/projects/${id}/contributions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, isAnonymous }),
        });
        toast({ description: "Payment Successful", variant: "success" });
        onClose();
      }
    } catch (error) {
      toast({ description: "Payment Failed", variant: "destructive" });
    }
  };


  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Payment Details</CardTitle>

        <p onClick={onClose}>
          Close
        </p>
      </CardHeader>
      <form onSubmit={handleStripePayment}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0.01"
              step="0.01"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(Boolean(checked))}
            />
            <Label htmlFor="anonymous">Make payment anonymous</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit Payment
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

