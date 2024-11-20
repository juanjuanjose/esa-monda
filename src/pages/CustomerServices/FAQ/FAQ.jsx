import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FAQ.css';

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: '¿Qué tipo de artesanías indígenas venden?',
      route: '/artesanias'
    },
    {
      question: '¿De qué regiones provienen las artesanías que ofrecen?',
      route: '/regiones'
    },
    {
      question: '¿Cómo garantizan la autenticidad de las artesanías?',
      route: '/autenticidad'
    },
    {
      question: '¿Ofrecen artesanías de alguna tribu o grupo étnico específico?',
      route: '/etnias'
    },
    {
      question: '¿Cuáles son los materiales utilizados en las artesanías?',
      route: '/materiales'
    },
    {
      question: '¿Cómo puedo contactar con ustedes si tengo más preguntas?',
      route: '/contacto'
    }
  ];

  const handleFAQClick = (route) => {
    navigate(route);
  };

  return (
    <div className="faq-container-main">
      <div className='faq-container-inner'>
        <h1 className="faq-header-main">Preguntas Frecuentes</h1>
        <div className="faq-list-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item-container"
              onClick={() => handleFAQClick(faq.route)}
            >
              <div className="faq-question-text">
                {faq.question}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
