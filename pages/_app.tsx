import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import EmptyLayout from "../components/Layout/EmptyLayout";
import Layout from "../components/Layout/Layout";
import axios from "axios";

import "../styles/globals.css";
import "primeicons/primeicons.css";
import "./../styles/prime_theme.css"
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

// axios.interceptors.request.use((config) => {
//   if (localStorage.getItem("authToken")) {
//     // @ts-ignore
//     config.headers.Authorization = `Bearer ${localStorage.getItem(
//       "socketCluster.authToken"
//     )}`;
//   }
//   return console.log(config);
// });

// axios.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.status == 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       originalRequest._isRetry = true;
//       try {
//         localStorage.removeItem("access_token");
//         const request: TokenRefreshBody = {
//           refreshToken: Cookie.get("refresh_token"),
//         };
//         const response = await AuthService.refreshToken(request);
//         if (response?.accessToken) {
//           localStorage.setItem("access_token", response?.accessToken);
//         }
//         return axios.request(originalRequest);
//       } catch (e) {
//         console.log("НЕ АВТОРИЗОВАН");
//       }
//     }
//     throw error;
//   }
// );

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth().then();
  }, []);

  const authComponents: string[] = ["/auth/login", '/auth/smsConfirm'];

  const checkAuth = async () => {
    if (!router.pathname.startsWith("/auth/login")) {
      if (localStorage.getItem("socketCluster.authToken")) {
        // router.push("/home/main");
      } else {
        redirect();
      }
    }
    setLoading(false);
  };

  const redirect = () => {
    if (window.location.pathname.startsWith("/home")) {
      router
        .push(
          `/auth/login?redirect=${encodeURIComponent(
            window.location.pathname + window.location.search
          )}`
        )
        .then();
    } else {
      router.push("/auth/login").then();
    }
  };

  if (loading) {
    return (
      <>
        <div className="overlay-content">
          <Spinner animation="border" variant="light" />
          <div className="text-spinner">{"Загрузка"}</div>
        </div>
      </>
    );
  } else {
    if (authComponents.includes(router.pathname)) {
      return <Component {...pageProps} />;
    }

    if (router.pathname.startsWith("/auth/login")) {
      return (
        <EmptyLayout>
          <Component {...pageProps} />
        </EmptyLayout>
      );
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}
