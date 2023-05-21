import React, { useState } from "react";
import { IoAddSharp } from "react-icons/io5";

const Qna = () => {
  const [showAnswers, setShowAnswers] = useState([]);

  const toggleAnswer = (index) => {
    const updatedShowAnswers = [...showAnswers];
    updatedShowAnswers[index] = !updatedShowAnswers[index];
    setShowAnswers(updatedShowAnswers);
  };

  return (
    <div
      id="faq"
      className="flex flex-col items-center justify-center bg-[#FF5757] p-5 py-10"
    >
      <h1 className="montserrat-subheading mb-6 border-b border-gray-200 pb-2 text-2xl text-white">
        FAQ
      </h1>
      <div
        className="flex flex-col items-start justify-center rounded-md bg-[#FFF7F7] p-5
         shadow-lg transition-all 
       md:w-[850px] lg:w-[900px] xl:p-14"
      >
        <h4
          onClick={() => toggleAnswer(0)}
          className="montserrat-subheading flex w-full cursor-pointer
          items-center justify-between gap-16 py-4 text-left
          text-gray-500 hover:text-gray-600 lg:text-lg"
        >
          1: How does cloak ensure the privacy and confidentiality of financial
          transactions?
          <span>
            {showAnswers[0] ? (
              <IoAddSharp
                color="#FF5757"
                className="rotate-45 text-3xl transition-all duration-100 lg:text-4xl"
              />
            ) : (
              <IoAddSharp
                color="#FF5757"
                className="text-3xl duration-100 lg:text-4xl"
              />
            )}
          </span>
        </h4>
        {showAnswers[0] && (
          <p className="montserrat-subheading w-[90%] px-4 pb-5  text-left  text-gray-400  transition-all duration-100">
            cloak employs secure secret addresses and a one-time public key
            mechanism, making it virtually impossible to trace or monitor
            transactions by anyone else. This ensures enhanced privacy and
            confidentiality.
          </p>
        )}

        <h4
          onClick={() => toggleAnswer(1)}
          className="montserrat-subheading flex w-full cursor-pointer items-center justify-between gap-16 py-4
          text-left text-gray-500 hover:text-gray-600 lg:text-lg"
        >
          2: What is a "stealth address" in cloak, and how does it enhance
          privacy?
          <span>
            {showAnswers[1] ? (
              <IoAddSharp
                color="#FF5757"
                className="rotate-45 text-3xl transition-all duration-100 lg:text-4xl"
              />
            ) : (
              <IoAddSharp
                color="#FF5757"
                className="text-3xl duration-100 lg:text-4xl"
              />
            )}
          </span>
        </h4>
        {showAnswers[1] && (
          <p className="montserrat-subheading w-[90%]  px-4  pb-5 text-left text-gray-400">
            A "stealth address" is a unique and anonymous address exclusively
            linked to the intended recipient. It guarantees utmost privacy by
            making it difficult for anyone else to trace the recipient or
            monitor their transactions.
          </p>
        )}

        <h4
          onClick={() => toggleAnswer(2)}
          className="montserrat-subheading flex w-full cursor-pointer items-center justify-between gap-16 py-4
          text-left text-gray-500 hover:text-gray-600 lg:text-lg"
        >
          3: How do I generate a unique cloak address?
          <span>
            {showAnswers[2] ? (
              <IoAddSharp
                color="#FF5757"
                className="rotate-45 text-3xl transition-all duration-100 lg:text-4xl"
              />
            ) : (
              <IoAddSharp
                color="#FF5757"
                className="text-3xl duration-100 lg:text-4xl"
              />
            )}
          </span>
        </h4>
        {showAnswers[2] && (
          <p className="montserrat-subheading w-[90%]  px-4  pb-5 text-left text-gray-400">
            Simply click the "generate" button on our app, and a unique cloak
            address will be generated for you. Make sure to save the
            accompanying DRM key in a secure location for future use.
          </p>
        )}

        <h4
          onClick={() => toggleAnswer(3)}
          className="montserrat-subheading flex w-full cursor-pointer items-center justify-between gap-16 py-4
          text-left text-gray-500 hover:text-gray-600 lg:text-lg"
        >
          4: Can I retrieve my private key after funds have been sent to my
          cloak's address?
          <span>
            {showAnswers[3] ? (
              <IoAddSharp
                color="#FF5757"
                className="rotate-45 text-3xl transition-all duration-100 lg:text-4xl"
              />
            ) : (
              <IoAddSharp
                color="#FF5757"
                className="text-3xl duration-100 lg:text-4xl"
              />
            )}
          </span>
        </h4>
        {showAnswers[3] && (
          <p className="montserrat-subheading w-[90%]  px-4  pb-5 text-left text-gray-400">
            Yes, you can retrieve your private key by clicking on the "match"
            button or by pasting your DontRevealMe key (optional) into our app.
            This will allow you to access the specific address where the funds
            have been sent.
          </p>
        )}

        <h4
          onClick={() => toggleAnswer(4)}
          className="montserrat-subheading flex w-full cursor-pointer items-center justify-between gap-16 py-4
          text-left text-gray-500 hover:text-gray-600 lg:text-lg"
        >
          5: Is cloak suitable for users with varying levels of technical
          expertise?
          <span>
            {showAnswers[4] ? (
              <IoAddSharp
                color="#FF5757"
                className="rotate-45 text-3xl transition-all duration-100 lg:text-4xl"
              />
            ) : (
              <IoAddSharp
                color="#FF5757"
                className="text-3xl duration-100 lg:text-4xl"
              />
            )}
          </span>
        </h4>
        {showAnswers[4] && (
          <p className="montserrat-subheading w-[90%]  px-4  pb-5 text-left text-gray-400">
            Absolutely! cloak has been designed with a user-friendly interface,
            making it accessible and easy to use for individuals with different
            levels of technical knowledge. Our app provides a seamless and
            intuitive experience for all users.
          </p>
        )}
      </div>
    </div>
  );
};

export default Qna;
