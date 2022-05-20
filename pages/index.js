import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Calculador de Divisas</title>
        <meta name="description" content="Calculador de divisas de magiobus" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="layout flex flex-col justify-between items-center w-full">
        <div className="headercontainer text-xl my-12 font-normal text-center">
          <h1 className="font-bold">
            Bienvenido al calculador de divisas de{" "}
            <a
              className="underline text-blue-400"
              href="https://twitter.com/magiobus"
              target={`_blank`}
            >
              @magiobus
            </a>
          </h1>

          <div className="description text-base mt-4">
            <p className="">
              Este proyecto te ayuda a convertir divisas de varias monedas.
            </p>
            <p>Usa el API x para hacer las conversiones.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
