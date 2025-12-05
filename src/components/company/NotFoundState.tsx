
import React from 'react';
import { Button } from '@/components/ui/button';

const NotFoundState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <p className="text-xl">Company not found</p>
      <Button variant="outline" className="mt-4" onClick={() => window.history.back()}>
        Go Back
      </Button>
    </div>
  );
};

export default NotFoundState;
