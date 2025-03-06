import { headers } from 'next/headers';
import { defaultUrl } from '../constants/nextUrl';

export async function fetchCheckoutData() {
  const incomingHeaders = await headers();
  const response = await fetch(`${defaultUrl}/api`, {
    credentials: 'include',
    headers: {
      Cookie: incomingHeaders.get('cookie') || '',
    },
  });

  if (!response.ok) {
    if (response.statusText === 'No Token') {
      throw new Error('You need to log in first!');
    }
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  if (data.success) {
    return data.extractedData;
  } else {
    throw new Error('Data fetch was not successful');
  }
}
