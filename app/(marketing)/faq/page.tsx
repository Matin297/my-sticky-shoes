import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import type { Metadata } from "next";
import { FAQ } from "./constant";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about My Sticky Shoes",
};

export default function FAQPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography gutterBottom component="h1" sx={{ typography: { xs: "h4", md: "h2" } }}>
          Frequently Asked Questions
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ maxWidth: 600, mx: "auto" }}>
          Find answers to common questions about My Sticky Shoes technologies, intentions,
          milestones and more.
        </Typography>
      </Box>

      <Paper>
        {FAQ.map(({ id, answer, question }) => (
          <Accordion variant="outlined" key={id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="textSecondary">{answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Paper>
    </Container>
  );
}
