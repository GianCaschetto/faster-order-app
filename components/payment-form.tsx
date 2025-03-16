"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CreditCard, Check } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  paymentMethod: z.enum(["card", "cash"]),
  cardNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{16}$/.test(val), {
      message: "El número de tarjeta debe tener 16 dígitos",
    }),
  cardName: z.string().optional(),
  expiryDate: z
    .string()
    .optional()
    .refine((val) => !val || /^(0[1-9]|1[0-2])\/\d{2}$/.test(val), {
      message: "La fecha de expiración debe estar en el formato MM/YY",
    }),
  cvv: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{3,4}$/.test(val), {
      message: "El CVV debe tener 3 o 4 dígitos",
    }),
  verificationCode: z
    .string()
    .min(6, {
      message: "El código de verificación debe tener al menos 6 caracteres",
    }),
});

interface PaymentFormProps {
  cartTotal: number;
  onComplete: () => void;
}

export default function PaymentForm({
  cartTotal,
  onComplete,
}: PaymentFormProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: "card",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      verificationCode: "",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);

      // For demo purposes, we'll verify if the code is "123456"
      if (values.verificationCode === "123456") {
        setIsVerified(true);
        onComplete();
      } else {
        setVerificationError(
          "Código de verificación inválido. Por favor, inténtalo de nuevo."
        );
      }
    }, 1500);
  };

  return (
    <Form {...form}>
      <form
        id="payment-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Método de pago</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Tarjeta de crédito/débito
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Efectivo en entrega</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {paymentMethod === "card" && (
            <>
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de tarjeta</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 5678 9012 3456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre en la tarjeta</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha de expiración</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
        </div>

        <div className="border-t pt-4">
          <h3 className="font-medium mb-2">Verificación de pedido</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Para propósitos de seguridad, por favor ingrese el código de
            verificación enviado a su teléfono. (Use &quot;123456&quot; para
            este demo)
          </p>

          {verificationError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{verificationError}</AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="verificationCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de verificación</FormLabel>
                <FormControl>
                  <Input placeholder="Enter code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Cuota de entrega</span>
            <span>$3.99</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${(cartTotal + 3.99).toFixed(2)}</span>
          </div>
        </div>

        {isVerifying && (
          <div className="flex items-center justify-center p-2 bg-blue-50 text-blue-600 rounded-md">
            Verificando información de pago...
          </div>
        )}

        {isVerified && (
          <div className="flex items-center justify-center p-2 bg-green-50 text-green-600 rounded-md">
            <Check className="h-5 w-5 mr-2" />
            Verificación exitosa! Listo para confirmar tu pedido.
          </div>
        )}
      </form>
    </Form>
  );
}
