'use client';

import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { ReactNode, Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: 'https://app.posthog.com',
    capture_pageview: false,
    autocapture: true,
  });
  // Tag every event with the source app so we can filter in PostHog dashboard
  posthog.register({ app: 'portfolio' });
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = window.origin + pathname + (searchParams.toString() ? '?' + searchParams.toString() : '');
      posthog.capture('$pageview', { $current_url: url });
    }
  }, [pathname, searchParams]);

  return null;
}

export function CSPostHogProvider({ children }: { children: ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PostHogProvider>
  );
}
