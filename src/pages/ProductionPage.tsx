import { ProductionShowcase } from '../components/ProductionShowcase';

interface ProductionPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function ProductionPage({ onNavigate }: ProductionPageProps) {
  return <ProductionShowcase onNavigate={onNavigate} />;
}
