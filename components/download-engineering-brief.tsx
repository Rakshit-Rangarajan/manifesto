"use client";

import dynamic from "next/dynamic";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export type EngineeringBrief = {
  title: string;
  expansion: string;
  stage: string;
  summary: string;
  problem: string;
  strategy: readonly string[];
  architecture: readonly string[];
  technology: readonly string[];
  caveat: string;
};

const PDFLink = dynamic(
  () => import("@react-pdf/renderer").then(module => module.PDFDownloadLink),
  { ssr: false, loading: () => <span className="inline-flex rounded-full border border-violet-400 px-5 py-3 text-sm">Preparing PDF…</span> }
);

const styles = StyleSheet.create({
  page: { padding: 48, fontFamily: "Helvetica", backgroundColor: "#0e1325", color: "#f4ecdf", fontSize: 11, lineHeight: 1.6 },
  eyebrow: { color: "#bca3f8", fontSize: 9, letterSpacing: 2, marginBottom: 12 },
  title: { fontSize: 32, fontFamily: "Helvetica-Bold", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#d3c1ec", marginBottom: 24 },
  section: { borderTopWidth: 1, borderTopColor: "#6e5b99", paddingTop: 14, marginTop: 18 },
  heading: { fontSize: 14, fontFamily: "Helvetica-Bold", marginBottom: 8 },
  body: { color: "#e1deed", marginBottom: 6 },
  item: { color: "#e1deed", marginBottom: 7 },
  note: { marginTop: 24, fontSize: 9, color: "#c4b9d4" },
});

function BriefDocument({ brief }: { brief: EngineeringBrief }) {
  return <Document title={brief.title + " | Engineering Brief"} author="Rakshit Rangarajan" subject="Conceptual engineering case study">
    <Page size="A4" style={styles.page} wrap>
      <Text style={styles.eyebrow}>THE ARCANE ENGINEER / ENGINEERING BRIEF</Text>
      <Text style={styles.title}>{brief.title}</Text>
      <Text style={styles.subtitle}>{brief.expansion} · {brief.stage}</Text>
      <Text style={styles.body}>{brief.summary}</Text>
      <View style={styles.section}><Text style={styles.heading}>The challenge</Text><Text style={styles.body}>{brief.problem}</Text></View>
      <View style={styles.section}><Text style={styles.heading}>Engineering approach</Text>{brief.strategy.map((item,i)=><Text key={i} style={styles.item}>{i+1}. {item}</Text>)}</View>
      <View style={styles.section}><Text style={styles.heading}>Conceptual architecture</Text>{brief.architecture.map((item,i)=><Text key={i} style={styles.item}>{i+1}. {item}</Text>)}</View>
      <View style={styles.section}><Text style={styles.heading}>Technology</Text><Text style={styles.body}>{brief.technology.join(" / ")}</Text></View>
      <View style={styles.section}><Text style={styles.heading}>Verification and limitations</Text><Text style={styles.body}>{brief.caveat}</Text></View>
      <Text style={styles.note}>This document describes a design approach. No unverified production metrics or completed capabilities are claimed.</Text>
    </Page>
  </Document>;
}

export default function DownloadEngineeringBrief({ brief, slug }: { brief: EngineeringBrief; slug: string }) {
  return <PDFLink document={<BriefDocument brief={brief} />} fileName={slug + "-engineering-brief.pdf"} className="inline-flex items-center rounded-full border border-violet-500 px-6 py-3 font-semibold text-violet-700 dark:text-violet-200">
    {({ loading, error }) => error ? "PDF unavailable" : loading ? "Preparing PDF…" : "Download engineering brief (PDF)"}
  </PDFLink>;
}
