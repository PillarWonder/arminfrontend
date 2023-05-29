import { useEffect, useState, KeyboardEvent } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

import Layout from "@/components/Layout";
import PoweredBy from "@/components/PoweredBy";
import ButtonOutline from "@/components/ButtonOutline";
import Input from "@/components/Input";
import Email from "@/components/Icons/Email";
import Loading from "@/components/Loading";

import { useAuthValues } from "@/contexts/contextAuth";
import { useShareValues } from "@/contexts/contextShareData";
import { useSizeValues } from "@/contexts/contextSize";

import useHomepage from "@/hooks/useHomepage";

import { validateEmail } from "@/libs/utils";

export default function ForgotPassword() {
  const { fetchPageContent } = useHomepage();
  const { isLoading, forgotPassword } = useAuthValues();
  const { artist } = useShareValues();
  const { isMobile } = useSizeValues();

  const [vidoeUrl, setVideoUrl] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const onForgotPassword = () => {
    if (!validateEmail(email)) {
      toast.error("Please enter valid email.");
      return;
    }

    forgotPassword(email);
  };

  useEffect(() => {
    fetchPageContent().then((value) => {
      if (value) {
        setVideoUrl(value?.backgroundVideo);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div
        className={twMerge(
          "relative w-full min-h-screen flex flex-col justify-end md:justify-center items-center",
          isMobile ? "pb-20" : "pb-2"
        )}
      >
        <div className="w-full h-full flex flex-col justify-end md:justify-center items-center z-10">
          <div className="w-full h-fit flex flex-col justify-end md:justify-center items-center text-primary pb-5">
            <h3 className="text-center text-primary text-2xl mb-2">
              {artist.artistName}
            </h3>
            <p className="text-center text-primary text-xl font-medium mb-5">
              Forgot Password
            </p>
            <div className="w-80 mb-10">
              <Input
                label=""
                placeholder="Email"
                type="email"
                value={email}
                setValue={setEmail}
                icon={<Email width={20} height={20} />}
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key == "Enter") {
                    onForgotPassword();
                  }
                }}
              />
            </div>

            <div className="mb-5">
              <ButtonOutline
                label="SEND LINK"
                onClick={() => onForgotPassword()}
              />
            </div>

            <div className="w-full flex flex-row justify-center items-center space-x-3 mb-5">
              <Link href="/signup">
                <p className="text-center text-primary text-lg hover:underline transition-all duration-300 cursor-pointer">
                  Sign Up
                </p>
              </Link>
              <div className="w-[1px] h-4 bg-primary"></div>
              <Link href="/">
                <p className="text-center text-primary text-lg hover:underline transition-all duration-300 cursor-pointer">
                  Sign In
                </p>
              </Link>
            </div>

            <div className="flex md:hidden w-full">
              <PoweredBy />
            </div>
          </div>
        </div>

        <div className="absolute left-0 top-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -left-4 -top-4 -right-4 -bottom-4 filter blur-[5px]">
            <video
              loop
              muted
              autoPlay
              playsInline
              disablePictureInPicture
              className="w-full h-full object-cover"
              src={vidoeUrl}
            >
              <source src={vidoeUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="loading">
          <Loading width={64} height={64} />
        </div>
      )}
    </Layout>
  );
}
