---
layout: archive
title: My thesis
url: /assets/pdfs/Thesis.pdf
redirect_from: 
    - /publications/bsc/
    - /bsc-thesis
---

[Get the PDF](/assets/pdfs/Thesis.pdf)

<figure>
<embed src='/assets/pdfs/Thesis.pdf'>
<caption>Embedded version of our thesis. Mohamed Yousif and Mohamed Jaafar.</caption>
</figure>
 <object width="400" height="400" data="/assets/pdfs/Thesis.pdf"></object> 
Summary of the thesis using sumy.


%% ---------------------------------------------------------------- \lhead{\emph{Contents}}  % Set the left side page header to "Contents" \tableofcontents  % Write out the Table of Contents
Our contribution can be summarized as follows \begin{itemize} \item Proposing new GGMs for datum computations in Sudan (ITU\_GGC16, and GECO) \item GeoidApp: the software that we use to compute, automate, and evaluate the results of our models \end{itemize}
\begin{itemize} \item Chapter 2\\ It introduces the theory behind the use of GGM in the development of spherical harmonics series.
GPS/leveling data are used to evaluate GGMs results by deriving the geoid height from them.
It is often that combined models have higher degrees than satellite-only models.
\\ The development of satellite missions (that uses Molodensky's theory) was going such that with every new model there is a possible increase in degrees, and hence the accuracy.
\begin{table}[] \centering \caption{Summary of GGM that were used in our study} \label{table:ggm_models_summary} \begin{tabular}{@{}llll@{}} \toprule \emph{Model Name} & Type  & Max Degree \si{\degree} & \emph{Tested models} $(m)$\\ \midrule ITU\_GGC16 & satellite-only & 280 & 270 \\ ITU\_GRACE16 & satellite-only & 180 & 170\\ EGM2008 & combined & 2190 & 500\\ EIGEN-6C4 & satellite-only & 2190 & 200\\ GECO & combined & 2190 & 500\\ \bottomrule
\section{Computing the Geoid}
\item The main function for geoid computations.
\subsection{Geoid height function}
Which indicates the same for our work.
Another feature of our work is the automation of degree computations of the models.
They only used 3 models,  EGM84, EGM96, and EGM2008.
A table summarizes our results for each model showing the best five degrees for each model is presented in the below tables.
For the other models (those of 2190), we have tested 500 degree for EGM2008, and GECO and 200 models from EIGEN-6C4.
\begin{table}[] \centering \caption{Top 5 degrees for model GECO on \cite{osman}} \label{table:geco_five_osman} \begin{tabular}{@{}lll@{}} \toprule \emph{degree} & std $\sigma$ [m]  & difference\\ \midrule 14 &6.579&    -10.016\\ 1722 &6.7273&   -11.102\\ 1726 &6.7295 &  -11.104\\ 1595 &6.7335 &  -11.105\\ 1731 &6.7342  & -11.106\\ \bottomrule
In our best 20 models (based on std) for all models, 18 of the 20 are classified as high degree models which is 90\% of the total 20 models.
Hence, the evaluation of different degrees of the model on local data.
\begin{table}[] \centering \caption{Top 5 degrees for model GECO on GPS/leveling data} \label{table:ggm_models} \begin{tabular}{@{}lll@{}} \toprule \emph{degree} & std $\sigma$ [m]  & difference\\ \midrule 149 &0.365480&    0.304553\\ 669 &0.369906&   0.379220\\ 665 &0.370001 &  0.378087\\ 263 &0.370542 &  0.367333\\ 674 &0.372194  & 0.378396\\ \bottomrule
We also highly recommend researchers to work on ``the unified datum"--geodetic main problem--which can only be solved by the means of GGM.
