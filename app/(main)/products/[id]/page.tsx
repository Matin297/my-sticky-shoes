import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById } from "@/services/generated/products/products";
import ProductDetails from "./_components/Details";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const id = (await params).id;
  const result = await getProductById(id).catch(() => null);
  const product = result?.data;

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const id = (await params).id;

  const result = await getProductById(id);
  const product = result.data;

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
