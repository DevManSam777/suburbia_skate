"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { FaCircleCheck, FaHouse } from "react-icons/fa6";

type CartItem = {
  id: string;
  deck: { name: string; texture: string };
  wheel: { name: string };
  truck: { name: string };
  bolt: { name: string };
  price: number;
  quantity: number;
};

type ShippingAddress = {
  address_line_1: string;
  address_line_2?: string;
  admin_area_1: string;
  admin_area_2: string;
  postal_code: string;
  country_code: string;
};

type PayerInfo = {
  name?: { given_name: string; surname: string };
  email_address?: string;
};

type OrderData = {
  orderNumber: string;
  items: CartItem[];
  total: number;
  paypalOrderId: string;
  timestamp: string;
  shippingAddress?: ShippingAddress;
  payerInfo?: PayerInfo;
};

export default function CheckoutSuccessPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem("lastOrder");
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder));
    }
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-texture bg-brand-gray flex items-center justify-center">
        <Bounded className="text-center">
          <Heading className="mb-6" as="h1">
            Loading...
          </Heading>
        </Bounded>
      </div>
    );
  }

  const orderDate = new Date(orderData.timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-texture bg-brand-gray py-12">
      <Bounded>
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <FaCircleCheck className="text-green-500 text-6xl" />
            </div>
            <Heading className="mb-4" as="h1">
              Order Confirmed!
            </Heading>
            <p className="text-xl mb-2">
              Thank you for your purchase!
            </p>
            <p className="text-gray-600 mb-6">
              This is a demo using PayPal Sandbox - no real payment was processed.
            </p>
          </div>

          {/* Order Details Card - Invoice Style */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-300">
              <div>
                <h1 className="text-3xl font-bold text-brand-purple mb-2">INVOICE</h1>
                <p className="text-sm text-gray-600">Suburbia Skate Co.</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="font-bold text-lg font-mono">{orderData.orderNumber}</p>
                <p className="text-sm text-gray-600 mt-2">{orderDate}</p>
              </div>
            </div>

            {/* Customer & Shipping Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8 pb-6 border-b">
              {orderData.payerInfo && (
                <div>
                  <h3 className="font-bold text-sm text-gray-600 mb-2">BILL TO</h3>
                  <p className="font-semibold">
                    {orderData.payerInfo.name?.given_name} {orderData.payerInfo.name?.surname}
                  </p>
                  {orderData.payerInfo.email_address && (
                    <p className="text-sm text-gray-600">{orderData.payerInfo.email_address}</p>
                  )}
                </div>
              )}
              {orderData.shippingAddress && (
                <div>
                  <h3 className="font-bold text-sm text-gray-600 mb-2">SHIP TO</h3>
                  <p className="text-sm">
                    {orderData.shippingAddress.address_line_1}<br />
                    {orderData.shippingAddress.address_line_2 && (
                      <>{orderData.shippingAddress.address_line_2}<br /></>
                    )}
                    {orderData.shippingAddress.admin_area_2}, {orderData.shippingAddress.admin_area_1} {orderData.shippingAddress.postal_code}<br />
                    {orderData.shippingAddress.country_code}
                  </p>
                </div>
              )}
              <div>
                <h3 className="font-bold text-sm text-gray-600 mb-2">PAYMENT METHOD</h3>
                <p className="font-semibold">PayPal</p>
                <p className="text-xs text-gray-500 mt-1">Transaction ID: {orderData.paypalOrderId}</p>
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-600 mb-2">PAYMENT STATUS</h3>
                <p className="font-semibold text-green-600">✓ PAID</p>
                <p className="text-sm text-gray-600 mt-1">
                  ${(orderData.total / 100).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Order Items - Invoice Table */}
            <div>
              <h2 className="font-bold text-lg mb-4 text-gray-700">ITEMS</h2>
              <table className="w-full">
                <thead className="border-b-2 border-gray-300">
                  <tr className="text-left text-sm text-gray-600">
                    <th className="pb-3">ITEM</th>
                    <th className="pb-3">DESCRIPTION</th>
                    <th className="pb-3 text-center">QTY</th>
                    <th className="pb-3 text-right">PRICE</th>
                    <th className="pb-3 text-right">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 last:border-b-0">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <Image
                              src={item.deck.texture}
                              alt={item.deck.name}
                              fill
                              className="object-contain rounded"
                            />
                          </div>
                          <span className="font-semibold">Custom Skateboard</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="text-xs text-gray-600">
                          <p>Deck: {item.deck.name}</p>
                          <p>Wheels: {item.wheel.name}</p>
                          <p>Trucks: {item.truck.name}</p>
                          <p>Bolts: {item.bolt.name}</p>
                        </div>
                      </td>
                      <td className="py-4 text-center">{item.quantity}</td>
                      <td className="py-4 text-right">${(item.price / 100).toFixed(2)}</td>
                      <td className="py-4 text-right font-semibold">
                        ${((item.price * item.quantity) / 100).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-gray-300">
                  <tr>
                    <td colSpan={4} className="pt-4 text-right font-semibold">SUBTOTAL:</td>
                    <td className="pt-4 text-right">${(orderData.total / 100).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="pt-2 text-right font-semibold">SHIPPING:</td>
                    <td className="pt-2 text-right text-green-600">FREE</td>
                  </tr>
                  <tr className="text-lg">
                    <td colSpan={4} className="pt-4 text-right font-bold">TOTAL PAID:</td>
                    <td className="pt-4 text-right font-bold text-green-600">
                      ${(orderData.total / 100).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-brand-lime bg-opacity-20 rounded-lg p-6 mb-6">
            <h2 className="font-bold text-lg mb-2">What happens next?</h2>
            <ul className="space-y-2 text-gray-700">
              <li>✓ You will receive a confirmation email shortly</li>
              <li>✓ Your custom skateboard will be crafted with care</li>
              <li>✓ Shipping typically takes 5-7 business days</li>
              <li>✓ You can track your order status via email</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="button-cutout group inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom gap-3 px-1 text-lg ~py-2.5/3 from-brand-purple to-brand-lime text-white"
            >
              <div className="flex size-6 items-center justify-center transition-transform group-hover:-rotate-[25deg] [&>svg]:h-full [&>svg]:w-full">
                <FaHouse />
              </div>
              <div className="w-px self-stretch bg-white/25" />
              Return to Home
            </Link>
            <Link
              href="/build"
              className="button-cutout inline-flex items-center bg-gradient-to-b from-25% to-75% bg-[length:100%_400%] font-bold transition-[filter,background-position] duration-300 hover:bg-bottom px-4 text-lg ~py-2.5/3 from-brand-orange to-brand-lime text-black"
            >
              Build Another Board
            </Link>
          </div>
        </div>
      </Bounded>
    </div>
  );
}
