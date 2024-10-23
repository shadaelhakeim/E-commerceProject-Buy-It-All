import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import Navbar from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer'
import './FAQ.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      className={`faq-item ${isOpen ? 'open' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="faq-question" onClick={toggleFAQ}>
        <span>{question}</span>
        <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
      </div>

      {isOpen && (
        <motion.div
          className="faq-answer"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {answer}
        </motion.div>
      )}
    </motion.div>
  );
};

const FAQ = (userData ,logout) => {
  const faqData = [
    { question: "How do I shop online from Buy It All?", answer: "You can shop online by adding items to your cart and proceeding to checkout..." },
    { question: "What payment options are available?", answer: "We accept various payment methods including credit cards, PayPal, and cash on delivery." },
    { question: "How do I track my order?", answer: "Once your order is placed, you will receive a tracking number to monitor the delivery progress." },
    { question: "What is the return or exchange policy?", answer: "Our return policy allows you to return products within 14 days of purchase, provided they are in their original condition." }
  ];

  return (
    <>
    
    <div className="faq-container">
    <Navbar userData={userData} logout={logout} />
      <h1>Frequently Asked Questions</h1>
      {faqData.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
    <Footer />
    </>
  );
};

export default FAQ;
