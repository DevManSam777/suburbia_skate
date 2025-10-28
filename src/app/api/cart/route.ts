import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/mongodb';
import Cart from '@/models/Cart';

// GET /api/cart - Get user's cart
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Find cart for this user
    const cart = await Cart.findOne({ userId }).lean();

    // Return cart or empty cart object
    const cartData = cart || { userId, items: [] };

    return NextResponse.json(
      { success: true, cart: cartData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

// PUT /api/cart - Update user's cart
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { items } = await request.json();

    await connectToDatabase();

    // Update or create cart
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { userId, items },
      { upsert: true, new: true }
    );

    return NextResponse.json(
      { success: true, cart },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

// DELETE /api/cart - Clear user's cart
export async function DELETE() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Clear cart items
    await Cart.findOneAndUpdate(
      { userId },
      { items: [] },
      { upsert: true }
    );

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { error: 'Failed to clear cart' },
      { status: 500 }
    );
  }
}
