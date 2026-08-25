import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BoltIcon from "@mui/icons-material/Bolt";
import "../../../css/help.css";

const categories = [
  {
    icon: "🚴",
    title: "Orders & Shipping",
    articles: "12 articles",
  },
  {
    icon: "↩️",
    title: "Returns & Warranty",
    articles: "8 articles",
  },
  {
    icon: "🔧",
    title: "Assembly & Service",
    articles: "10 articles",
  },
  {
    icon: "💳",
    title: "Payments & Financing",
    articles: "6 articles",
  },
  {
    icon: "📏",
    title: "Sizing & Fit",
    articles: "9 articles",
  },
  {
    icon: "⚡",
    title: "E-Bikes & Batteries",
    articles: "7 articles",
  },
];

const questions = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3–5 business days. Bikes ship 90% assembled in a protective crate, and premium builds include free doorstep assembly in most metro areas.",
  },
  {
    question: "Do bikes arrive fully assembled?",
    answer:
      "Most bikes arrive approximately 90% assembled. You will only need to attach a few components such as pedals, handlebars, or the front wheel.",
  },
  {
    question: "What is your return policy?",
    answer:
      "You can request a return within the eligible return period, provided the bike meets our return conditions.",
  },
  {
    question: "How do I choose the right frame size?",
    answer:
      "Use our sizing guide to compare your height and inseam measurements with the recommended frame size for your bike.",
  },
  {
    question: "What warranty comes with my bike?",
    answer:
      "Warranty coverage depends on the bike and its components. Contact our support team if you need help understanding your warranty.",
  },
  {
    question: "How far can an e-bike travel on one charge?",
    answer:
      "Range depends on battery capacity, rider weight, terrain, riding mode, weather, and speed.",
  },
];

export default function HelpPage() {
  const [search, setSearch] = useState("");

  return (
    <Box className="help-page">
      {/* HERO */}
      <section className="help-hero">
        <Container maxWidth="md">
          <Typography className="help-title">How Can We Help You?</Typography>

          <Typography className="help-subtitle">
            Search our help center or browse the topics below.
          </Typography>

          <TextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for answers..."
            className="help-search"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Container>
      </section>

      {/* CATEGORIES */}
      <section className="help-section">
        <Container maxWidth="xl">
          <Typography className="section-title">Browse by Category</Typography>

          <Box className="category-grid">
            {categories.map((category) => (
              <Paper
                key={category.title}
                elevation={0}
                className="category-card"
              >
                <Box className="category-icon">{category.icon}</Box>

                <Box className="category-content">
                  <Typography className="category-title">
                    {category.title}
                  </Typography>

                  <Typography className="category-articles">
                    {category.articles}
                  </Typography>
                </Box>

                <ArrowForwardIcon className="category-arrow" />
              </Paper>
            ))}
          </Box>
        </Container>
      </section>

      {/* QUESTIONS */}
      <section className="questions-section">
        <Container maxWidth="md">
          <Typography className="section-title">Popular Questions</Typography>

          <Box>
            {questions.map((item, index) => (
              <Accordion
                key={item.question}
                defaultExpanded={index === 0}
                disableGutters
                elevation={0}
                className="faq-item"
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  className="faq-question"
                >
                  <Typography sx={{ fontWeight: 700 }}>
                    {item.question}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails className="faq-answer">
                  <Typography>{item.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </section>

      {/* SUPPORT */}
      <section className="support-section">
        <Container maxWidth="xl">
          <Box className="support-grid">
            {/* CONTACT */}
            <Paper elevation={0} className="support-card">
              <Box className="support-icon">
                <span aria-hidden>💬</span>
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 800, color: "white" }}>
                Contact Support
              </Typography>

              <Typography className="support-description">
                Our bike experts reply within a few hours, 7 days a week.
              </Typography>

              <Button className="support-outline-button">Email Us</Button>
            </Paper>

            {/* LIVE CHAT */}
            <Paper elevation={0} className="support-card live-chat-card">
              <Box className="support-icon live-chat-icon">
                <BoltIcon />
              </Box>

              <Typography variant="h5" sx={{ fontWeight: 800, color: "white" }}>
                Live Chat
              </Typography>

              <Typography className="support-description">
                Get instant answers from a real rider. Average wait under 30
                seconds.
              </Typography>

              <Button className="chat-button">
                <span className="online-dot" />
                Start Chat
              </Button>
            </Paper>
          </Box>
        </Container>
      </section>
    </Box>
  );
}
