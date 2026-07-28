import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

export function TranslateIcon(props: Props) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}><path d="M0 0h24v24H0z" fill="none"/><path d="m12.87 15.07-2.54-2.51.03-.03A16.7 16.7 0 0 0 14.07 6H17V4h-7V2H8v2H1v1.99h11.17A15.7 15.7 0 0 1 9 11.35 15.6 15.6 0 0 1 6.69 8h-2a17.4 17.4 0 0 0 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04ZM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12Zm-2.62 7 1.62-4.33L19.12 17h-3.24Z"/></svg>;
}

export function DeviceIcon(props: Props) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export function BellIcon(props: Props) {
  return <svg viewBox="0 0 16 18" fill="none" aria-hidden="true" {...props}><path d="M10.381 13.235a22.49 22.49 0 0 0 4.545-1.092A7.59 7.59 0 0 1 13 7.125V6.5a5 5 0 0 0-10 0v.625a7.59 7.59 0 0 1-1.926 5.018 22.79 22.79 0 0 0 4.545 1.092m4.762 0a20.15 20.15 0 0 1-4.762 0m4.762 0a2.5 2.5 0 1 1-4.762 0" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
