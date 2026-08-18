import React from 'react';
import { Link } from 'react-router-dom';
import { sectionTo } from '@/lib/nav';

export default function SectionLink({ hash, className, children, onClick, ...props }) {
  return (
    <Link to={sectionTo(hash)} className={className} onClick={onClick} {...props}>
      {children}
    </Link>
  );
}
