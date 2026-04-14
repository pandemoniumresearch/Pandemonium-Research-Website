---
slug: nfl
title: "No Free Lunch Theorems"
authors:
  - Nikhil R
date: '2025-08-28'
tags:
  - Math
  - ML
  - Statistical Learning Theory
summary: "No Free Lunch theorems are a class of results in optimization and machine learning that assert the equivalence of all learners in expectation over all problems. This article provides an introduction to NFL theorems in the context of machine learning."
---

## An Elementary Model

Consider the data generating process specified by the tuple
$(\mu, A, a, c)$ where $\mu$ is a probability measure over some set of
objects $\mathcal{X}$ each with an associated label in $\{0,1\}$, $A$ is
the set of all possible object attributes, $a$ is an observation rule,
and $c$ is the conditional probability. The classification task is to
learn an approximation $s$ of the conditional probability distribution
$a$ given some training data
$\tau = ((a_1,y_1),...,(a_n, y_n)), a_i \in A, y_i \in \{0,1\}$. A
*learner* $L$ is an algorithm that consumes $\tau$ and outputs $s$ with
no knowledge of $c$ or $\mu$. *Generalization accuracy* is the
probability of predicting the correct label for un-observed attributes.

## A Conservation Law

A useful notion of *generalization performance* would be to measure
generalization accuracy relative to a random guesser. A random guesser
would always achieve a generalization accuracy of $0.5$. Consequently,
let Generalization performance = Generalization Accuracy - 0.5.

Let $T = (A \times \{0,1\})^n$ be the set of all possible training data
and $GP_{L}(a_0, c; \tau)$ denote the *generalization performance* of a
learner $L$ for objects such that $a(x) = a_0$, given $\tau \in T$.
Since $A$ is finite, every $c$ can be identified by an m-tuple
$(c(a_1), c(a_2), ..., c(a_m))$.

To evaluate the learner, we can consider an expression of the form:
$$\int_{[0,1]^m}{\mathbb{E}_{T}\mathbb{E}_A{GP_L(c)} \, dc} = \int_{[0,1]^m}{\sum_{\tau \in T, a_i \notin \tau}
   \mathbb{P}(\tau | c)\mathbb{P}(a_i)GP_L(a_i, c; \tau)
 \, dc}$$

Now consider just the expression
$I(\tau) = \int_{[0,1]^m}{\sum_{i}{\mathbb{P}(\tau|c)\mathbb{P}(a_i)GP_L(a_i, c; \tau)} \, dc}$.
For a fixed $\tau \in T$, we can construct
$\forall c \in [0,1]^m, c' \mid c'_i = c_i \iff a_i \in \tau$ otherwise
$c'_i = 1 - c_i$. Thus, for a given $\tau$ we have a permutation
$c \to c'$. Observe that $\mathbb{P}(\tau|c) = \mathbb{P}(\tau|c')$.
Changing variables, we have
$I(\tau) = \int_{[0,1]^m}{\sum_{i}{\mathbb{P}(\tau|c')\mathbb{P}(a_i)GP_L(a_i, c'; \tau)} \, dc}$.
Let $s_i$ be the probability that $L$ predicts 1 for $a_i$. Then, $\forall a_i \notin \tau$:

$$\begin{aligned}
GP_L(a_i, c; \tau) &= s_i c_i + (1-s_i)(1-c_i) -0.5 \\
GP_L(a_i, c';\tau) &= s_i (1-c_i) + (1-s_i)c_i - 0.5 \\
\implies GP_L(a_i,c;\tau) &+ GP_L(a_i,c';\tau) = 0
\end{aligned}$$

Thus,
$$I(\tau) = \frac{1}{2}\int_{[0,1]^m}{\mathbb{P}(\tau|c)\sum_{a_i \notin \tau}\mathbb{P}(a_i)\bigl(GP_L(a_i,c;\tau) + GP_L(a_i,c';\tau)\bigr) \, dc} = 0$$

We have effectively shown that,
$$\int_{[0,1]^m}{\mathbb{E}_{T}\mathbb{E}_A{GP_L(c)} \, dc} = \sum_{\tau \in T}{I(\tau)} = 0$$

In other words, *"Generalization Performance is conserved over all
learning situations"!* Consequently,

- If there are problems where a learner out-performs another
  significantly, there must exist problems where the learner
  under-performs by the same amount in total.
- Every optimizer is as good or as bad as every other optimizer.
- We cannot, *a priori*, **expect** learners to do better than random
  chance.

## Related Notions

Ray Solomonoff (1960) introduced the idea of inductive inference by a
computational formalization of pure Bayesianism. Let $T$ be a theory,
and $A$ be any alternative theory, and $D$ be observed data. Conditional
probability dictates,
$$\mathbb{P}(T|D) =
\frac{\mathbb{P}(T)\mathbb{P}(D|T)}
{\mathbb{P}(T)\mathbb{P}(D|T) + \sum_A{\mathbb{P}(A)\mathbb{P}(D|A)}}$$
Then future data $F$ can be predicted as:
$$\mathbb{P}(F|D) = \sum_T{\mathbb{P}(F|T,D)\mathbb{P}(T|D)}$$
Clearly, this requires a prior probability over all theories. One such prior
could be $\mathbb{P}(T) \propto 2^{-K(T)}$ where $K(T)$ is the
prefix-free *Kolmogorov Complexity* of $T$ (normalizable by Kraft's
Inequality).

Generally, the Kolmogorov complexity of an object $T$ is defined as the
length of the shortest valid computer program (in a specific language)
that produces $T$ as the output.

Theoretically, it is meaningful to only speak of Kolmogorov complexity
in the context of Turing-complete languages, since for any
Turing-complete languages $L, M$, we have $K_{L}(T) = K_M(T) + O(1)$.
Evidently, given any language L, we can write an interpreter for
language M, and embed the shortest program in language M, and so obtain
a program in L with a constant overhead independent of T.

The aforementioned universal prior favours low-complexity theories or
algorithms. In this manner, a universal learner employing Solomonoff's
Induction formalizes the following philosophical tools:

- *Occam's Razor*: The simplest explanation is the most plausible.
- *Epicurus' Principle*: If multiple theories explain the observations,
  retain them all.

Solomonoff Induction is said to be complete, if the cumulative errors
made by predictions are upper-bounded by the Kolmogorov-complexity of
the data-generating process.

An adversarial argument shows that *completeness and computability are
mutually exclusive*.

## Kolmogorov-Style NFL

Goldblum et al. (2024) discuss a Kolmogorov-style formulation of the No
Free Lunch Theorem. Let $T \in (X \times Y)^{n}$ be a dataset uniformly
sampled over both objects ($X$) and labels ($Y$). Then, with probability at
least $1 - \delta$, for every classifier that uses a conditional
distribution $p(y|x)$, the empirical cross-entropy ($CE$) is bounded
below as:
$$CE(p) \geq \ln|Y| -\frac{\ln(2)}{n}\bigl(K(p) + 2\log_{2}(K(p)) - \log(\delta) + c\bigr)$$
where $c$ is a constant depending on the choice of language for $K$.
This is an intuitive result, since in particular it implies that *no
model can represent a classifier with appreciably lower cross-entropy*
than that attained from random guess *when the data is incompressible*,
if the dataset is large enough.

## PAC Learnability and NFL

Valiant (1984) introduced Probably-Approximately-Correct (PAC) learning as a
formal model for machine learning tasks, capturing learning as a search
through a set of hypotheses that, with high probability, finds a
hypothesis within a bounded error.

A hypothesis class $\mathcal{H}$ is agnostic PAC-learnable with respect
to a set $Z$ and a (measurable) loss function
$l:\mathcal{H} \times Z \to \mathbb{R}_{+}$ if there exists a function
$m_{\mathcal{H}}: (0,1)^2 \to \mathbb{N}$ and a learning algorithm
which: for every $\epsilon, \delta \in (0,1)$, and probability space $D$
over $Z$, when running the algorithm on $m \geq m_{\mathcal{H}}$ i.i.d.
examples generated by $D$ the algorithm returns $h \in \mathcal{H}$ such
that, with probability at least $1 - \delta$,
$$\mathcal{L}_{D}(h) \leq \min_{h' \in \mathcal{H}}{\mathcal{L}_D(h')} + \epsilon$$
where $\mathcal{L}_{D}(h) = \mathbb{E}_{z \sim D}[l(h, z)]$.

Suppose $A$ is a learning algorithm for binary classification with
respect to 0-1 loss over a domain $\mathcal{X}$. Let $m \in \mathbb{N}$
such that $m < \frac{|\mathcal{X}|}{2}$. Then there exists a
distribution $D$ over $\mathcal{X} \times \{0,1\}$ and a labelling
function $f$ such that $\mathcal{L}_D(f) = 0$ and
$$\mathbb{P}_{S \sim D^{m}}\!\left(\mathcal{L}_D(A(S)) \geq \frac{1}{8}\right) \geq \frac{1}{7}$$

It can be shown that for a set $C \subset \mathcal{X}$ such that $|C| = 2m$,
any learner that observes only $m$ examples cannot comment about the
remaining items in $C$. Considering all functions from $C \to \{0,1\}$,
$f_1, f_2, \ldots, f_{2^{2m}}$, "complement-pairing" shows that
$\exists\, i \in [2^{2m}]$:
$$\mathbb{E}_{S \sim D_{i}^{m}}\!\left[\mathcal{L}_{D_i}(A(S))\right] \geq \frac{1}{4}$$
$$D_i(x,y) = \begin{cases}
            \frac{1}{2m} & \text{if } y = f_i(x)\\
            0 & \text{otherwise}
           \end{cases}$$

For a hypothesis class $\mathcal{H}$ of binary labelling functions over
$\mathcal{X}$, the VC-Dimension is defined as the cardinality of the
largest $C \subset \mathcal{X}$ such that the restriction
$\mathcal{H}_{C}$ contains all functions from $C$ to $\{0,1\}$.

*The Fundamental Theorem of Statistical Learning* states that
VC-Dimension characterizes PAC-learnability: a hypothesis class is
PAC-learnable if and only if it has finite VC-Dimension.

Ultimately:

- PAC Learnability is not inconsistent with No Free Lunch Theorems.
- NFLs consider hypothesis classes of infinite VC-Dimension.
- *PAC-Learning succeeds by incorporating an Inductive Bias*.

## Simplicity Bias

Part of the success of deep neural networks can be attributed to an
inherent simplicity bias. Recent research empirically confirms:

- GPT-2 (pre-trained and randomly initialized) models produce
  low-complexity bitstrings with higher probability (Goldblum et al., 2024).
- Deep networks are inductively biased to find lower "effective-rank"
  ($-\sum{\tilde{\sigma}_i\ln(\tilde{\sigma}_i)}$) embeddings (Huh et al., 2022).
- Although deep networks, which are often over-parametrized, can memorize
  noise data, they tend to learn simple patterns first (fewer critical
  samples) (Arpit et al., 2017).

## References

1. Schaffer, C. (1994) 'A conservation law for generalization
   performance', *Machine Learning Proceedings 1994*, pp. 259–265.
   doi:10.1016/b978-1-55860-335-6.50039-8.

2. Shalev-Shwartz, S. and Ben-David, S. (2022) *Understanding Machine
   Learning: From Theory to Algorithms*. Cambridge University Press.

3. Valiant, L.G. (1984) 'A theory of the learnable', *Proceedings of the
   Sixteenth Annual ACM Symposium on Theory of Computing — STOC '84*,
   pp. 436–445. doi:10.1145/800057.808710.

4. Wolpert, D.H. and Macready, W.G. (1997) 'No free lunch theorems for
   optimization', *IEEE Transactions on Evolutionary Computation*, 1(1),
   pp. 67–82. doi:10.1109/4235.585893.
