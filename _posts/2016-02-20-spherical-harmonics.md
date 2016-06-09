---
layout:     post
title:      Spherical harmonics Understanding the weird part
date:       2016-02-20 12:31:19
summary:    In this I'll demonstrate the concept of spherical harmonics.
categories: project
---

## A DISCLAIMER
* This post isn't intended to be comprehensive, full of math notations, weird concepts, formal language whatsoever! 
* I'll try to use as less math notations as possible.
* This is just for adding other bullets.
* Spherical harmonics are used in many applications, which rise the problem of naming conventions, I had trouble times suffering from this issue, it doesn't seem to exist a unique notations. With that being said, all the notations I'll be using here are from ``Physical Geodesy`` and most of them are from Germany authors (just in case it conflicts with Americans authors, anyway most of geodesy literature are from Germany).

## Conventions in this post
* Vectors will be indicated by **v**, while matrices will be indicated by **A** [capital bold letter], anyway you should understand them from the context.
* Acronyms, I'll indroduce the full name first, then it's acronym which I'll use it in the rest of the post.

## Physics is boring, math is even worse! Both? Are you kidding me?
Let's face it! We all hate physics classes. Most of them was too intuitive that makes you react like? Whaaat?
When you asked why bodies are falling? Else, are just to hard to be expalined. Physics relies heavily on mathematics, without it, it's just a philosphy. In this post I'll try to make things as simple as possible but not simpler.

It's the default action to search wikipedia for an article of whatever you want.

> spherical harmonics are a series of special functions defined on the surface of a sphere used to solve some kinds of differential equations.

Have we learned something? Not sure, let's jump to other part

> Spherical harmonics are functions defined in terms of spherical coordinates and are organized by angular frequency...


The reason for being no, is that there are already a lot of prerequisites, that's great actually, assuming that you've a general idea about them. You should have an idea about ``differential equations`` and how they relate to it, ``angular frequency``! What if I don't have an idea about them? Or I just failed to link them? This post is for that reason!

I guess that gives me a good to reason to write this post.

## What the heck are spherical harmonics?
We all know what sphere is, and we probably heard the word ``harmonic`` a few times in music. They both seem too intuitive, but there inlies the problem.
Being too intuitive makes it very hard, I mean can you describe for someone why ``1 + 1 = 2?`` It's really hard.

From a math perspective, a function is a called a harmonic if it satisfies Laplace's equation.

$$\Phi = 0$$

A very good question arise, why do we care about solving Laplace's equation?
The answer for this question is even trickier! We need to solve Laplace's equation as a step for solving boundary values problems ``BVPs``. Before you ask, we need to solve BVPs because, in our case, earth is a good example of a boundary problem (It's bounded by latitudes and longitudes). 

## Boundary value problems

### What is the Boundary value problem?

If I didn't mention this term before that officially makes me a horrible writer! Our problem is to determinet the gravitational force in outer space without knowing the denisty structure of the earth. See [this](en.wikipedia.com/wiki/boundary_value_problem) wikipage for nice explanation. [^1] Boundary value problem is differntial equation with a set of other constraints called the *boundary conditions*. The important part is that the solution of the boundary value problem is also a solution to the differential equation.
Now we have a better idea of what our problem is, we can't measure the density of the earth. Molodonskey was the first that to base physical geodesy on boundary value problems on the earth's surface rather than on the geoid [^2] Hoffmann et, al. 
More generally a ``BVP`` tries to determine a function in a spatial domain from:

- It's value on the boundary,
- it's spatial behaviour, described by a partial differential equation.

Three BVPs are defined to determine $\Phi$ in the outer space from $\nabla \Phi = 0$ with one of the three following boundary conditions.


| $1^{st}$ BVP| $2^{nd}$ BVP                     | $3^{rd}$ BVP                                |
| Dirichlet   | Neumann                               | Robin                                       |
| $\Phi$      | $\frac{\partial \Phi}{\partial n}$    | $\Phi + c \frac{\partial \Phi}{\partial n}$ |

As a further condition we must require a regular behaviour for $r \to \infty$.

Geodetic examples of the boundary functions are geopotential values (Dirichlet), gravity disturbance (Neumann), amd gravity anomaly (Robin).

$$
\begin{equation}\label{eqn:regularity}
\lim_{r \to \infty} \Phi (r) = 0
\end{equation}
$$

## Solving Laplace's equation

### Solving Laplace's equation in Cartesian coordinates

Let's consider the case of planar surface where x and y are the horizontal coordinates, z is the vertical coordinates. In this case we want to solve $f(x, y, z) = 0$ where z > 0.
A very important step in the solution is the separation of variables. For that let's rewrite the previous equation as follows

$$
\begin{equation}\label{laplace}
\nabla (x, y, z) = \nabla f(x) g(y) h(z) = 0
\end{equation}
$$

applying the chain rule will give us the following.

$$
\begin{equation}
\frac {\partial ^ 2 f(x)} {\partial x ^ 2} g(y) h(z) + f(x) \frac{\partial ^ 2 g(y)} {\partial y ^ 2} h(z) + f(x) g(y) \frac{\partial ^ 2 h(z)}{\partial z ^ 2} = 0
\end{equation}
$$

The first summand on the equation only depends on x, the g-part depends on y, the h-part depends on z.

We can modify the previous equation as follows

$$
\begin{equation}\label{eqn:rect}
f''gh + fg''h + fgh'' = 0
\end{equation}
$$

Dividing the equation by ``1 / fgh``

$$\frac{f''}{f} + \frac{g''}{g} + \frac{h''}{h}$$

And now for something completely different...

The separation of variables leads to a separation of the partial derivatives equations into three ordinary differential equations ``(ODEs)``.

$$\frac{f''}{f} = -n^2, f'' + n^2f = 0$$

$$\frac{g''}{g} = -m^2, g'' + m^2g = 0$$

$$\frac{h''}{h}, n^2 + m^2, h'' - (n^2 + m^2)h = 0$$

The solution of these ``ODEs`` is elementary since they're $2^{nd}$ order ``ODE``.

$$
\begin{equation}\label{eqn:ode}
f_1(x) = cos(nx),  f_2(x) = sin(nx)

g_1(y) = cos(my), g_2(y) = sin(my)

h_1(z) = e^{\sqrt{n^2 + m^2z}}, h_2(z) = e^{\sqrt{n^2 + m^2z}}
\end{equation}
$$

The general solution $\Phi(x, y, z)$ will be the product of $f, g$, and $h$. However for each n, and m we get a new solution. So, we have to count for all possible solutions for all combinations of m, n.
$$
\begin{equation}\label{eqn_2}
\Phi(x, y, z) = \sum_{n=0}^{\infty}\sum_{m=0}^{\infty} \left(
    a_{nm} cos(nx) cos(my) + b_{nm} cos(nx) sin(my)\\+
    c_{nm} sin(nx) cos(my) + \\d_{nm} sin(nx) sin(my) ) e^{-\sqrt{n^2 + m^2z}}+
    (e_{nm} cos(nx) cos(my) \\+ f_{nm} cos(nx) sin(my)+
    g_{nm} sin(nx) cos(my) \\+ h_{nm} sin(nx) sin(my))e^{\sqrt{n^2 + m^2z}} \right)
\end{equation}
$$
The solution of the Laplace's equation is not a solution of the ``BVP``. It only gives us the behaviour of the potential $\Phi$ in terms of base functions.
For the horizontal domain the base functions are sines and cosines. Thus the potential is a Fourier series in the horizontal domain. The $n$ and $m$ are the wave numbers; the higher they are, the shorter the wavelengths.
The vertical base functions are called _upward continutation_, since they describe the vertical behaviour. They either have a damping (with the minus sign), or amplifying effect. This effect apparently depends on $n$ and $m$. The higher $\sqrt{n^2 + m^2}$ the shorter the wavelength, the stronger the damping or amplifying effect. Thus the upward continutation either works as low-pass filter (minus sign), or as a high-pass filter.

### Solution of Dirichlet and Neumann BVPs in $x y z$

**Dirichlet** Given:

- the general solution in $\eqref{eqn_2}$
- the regularity condition $\eqref{eqn:regularity}$
- the potential on the boundary ``z = 0``: $\Phi (x, y, z)$
solve for $\Phi$. The regularity condition demands already that we discard all contributions with the amplifying upward continuation. So half of the previous equation $\eqref{eqn_2}$ is used.
Next, we suppose that the boundary function is developed into a 2D Fourier series:

$$
\begin{equation}\label{fourier}
\Phi(x, y, z) = \sum_{n=0}^\infty \sum_{m=0}^{\infty} (P_{nm} cos(nx) cos(my) + q_{nm} cos(nx) sin(my) + \\r_{nm} sin(nx) cos(my) + s_{nm} sin(nx) sin(my) )
\end{equation}
$$

The full solution of the BVP is now obtained by comparsion of these known spectral coefficients with the unknown coefficients from the general solution.

$$
\begin{align}
a_{nm} = p_{nm}, b_{nm} = q_{nm},c_{nm} = r_{nm}, d_{nm} = s_{nm}\\
e_{nm} = f_{nm} ٍ= g_{nm} &= h_{nm} = 0
\end{align}
$$



## Spherical Harmonics

Fourier's series can't be applied on the sphere, so the solution of the Laplace equation will provide a new set of base functions. We'll assume a spherical Earth and we will use spherical coordinates $r, \theta, \lambda$
So generally the algorithm for solving the BVP is as follows:

* write down Laplace's equation in spherical coordiantes.
* separation of variables [very important step] [^3]
* Solution of the 3 seperate ODEs
* combining all possible into a series development
* apply the regularity condition and discard conflicting solutions
* develop boundary functions (Dirichlet and Neumann) into series
* compare coefficients
* write down the full solution

Recall that Laplace equation was as follows $\eqref{laplace}$

The spherical form is now as follows

$$
\begin{equation}
\nabla\Phi = \frac{\partial^2 \Phi}{\partial r^2} + \frac{2}{r} \frac{\partial \Phi}{\partial r}
+\\ \frac{1}{r^2} \frac{\partial^2 \Phi}{\partial \theta^2} + \frac{cot(\theta)}{r^2} \frac{\partial \theta}{\partial \theta} +\\
\frac{1}{r^2sin^2(\theta)} \frac{\partial^2 \Phi}{\partial \lambda^2} = 0
\end{equation}
$$

Now, let's multiply it with $r^2$ we get the simpler form:
$$
\begin{equation}
\boxed{
    r^2 \frac{\partial^2 \Phi}{\partial r^2} + 2r \frac{\partial \Phi}{\partial r} +
    \frac{\partial^2 \Phi}{\partial \theta^2} + \cot \theta \frac{\partial \Phi}{\partial \theta} +
    \frac{1}{\sin ^2} \frac{\partial^2 \Phi}{\partial \lambda^2}
}
\end{equation}
$$

$$
\begin{equation}
r^2 \frac{\partial^2 \Phi}{\partial r^2} + 2r \frac{\partial \Phi}{\partial r} + \nabla_s \Phi = 0
\end{equation}
$$

Having done that, let's use primes symbols, just to make the equation easier to read.

$$
\begin{equation}
r^2 f'' Y + 2rf'Y + f\nabla_s Y = 0
\end{equation}
$$
Again, dividing by $\frac{1}{fY}$, gives us:

$$
\begin{equation}\label{eqn:sphere}
r^2 \frac{f''}{f} + 2r \frac{f'}{f} + \frac{\nabla_s Y}{Y} = 0
\end{equation}
$$

You can guess that the solution of Laplace's equation in spherical is quite similar to the rectangular one. From the preceding development of ``Lapalce's equation``, which you can find it $\eqref{eqn:rect}$.
From the preceding $\eqref{eqn:sphere}$, the first part only depends on r, where the second part depends on what is so called the angular part.
In the previous equation, we used two new terms, which is really bad practice. However, the idea behind these two terms is to seperate the equation into two parts. By setting $\Phi\left(r, \theta, \lambda \right) = f\left(r\right) Y \left(\theta, \lambda \right)$, and then the angular components are treated by setting $Y\left(\theta, \lambda \right) = g\left(\theta\right) h\left(\lambda\right)$, then apply the Laplace operator to $\Phi = fY$, which in turns yields $\eqref{eqn:sphere}$.

And again, to solve this differential equation, we'll use the same technique that we used in the rectangular case. The first part, as noted before only depends on r, where the second part depends on the angular coordinates. In order to yield zero for all $r, \theta, \lambda$ (i.e., to satisfy the harmonic condition) we conclude that both parts are constant. It turns out that $l(l+1)$ is a good solver for the ```ODE``.

$$
\begin{equation}
r^2f'' + 2rf' - l(l+1)f = 0
\end{equation}
$$

Which can be solved by trying the function $r^n$ [^4]. Which yields $f_1(r) = r^{-(l+1)}$ and $f_2(r) = r^l$
I could have excluded this part and refer to any Geodesy literature, but for the sake of the completeness, and perhabs making you think that the guy behind this post knows what he says, I'll include it.
Let's get back to the surface Laplace operator and seperate $Y$ into $g(\theta)h(\lambda)$

$$
\begin{align*}
\nabla_sY + l(l+1)Y &= 0 && \text{surface Laplace operator}\\
\frac{\partial^2Y}{\partial \theta^2} + cot(\theta) \frac{\partial Y}{\partial \theta} + \frac{1}{sin^2(\theta)} \frac{\partial^2Y}{\partial \lambda^2} + l(l+1)Y &= 0 && \text{We replace } \nabla_s \text{with the corresponding derivatives.}\\
g''h + cot(\theta) g' h + \frac{1}{sin^2(\theta)} gh'' + l(l+1)gh &= 0 && \text{Using the primes, with the function as } g\\
\underbrace{sin^2(\theta) \frac{g''}{g} + sin^2 (\theta) cot(\theta)\frac{g'}{g} + l(l+1) sin^2(\theta)}_\text{m^2} + \underbrace{\frac{h''}{h}}_\text{-m^2} m^2 &= 0
\end{align*}
$$

<br>

Following the same reasoning as we did in rectangular case, the left part only depends on $\theta$, while the right part depends on 
$\lambda$. The ``ODE`` of the $\lambda$ part leads to the known solution:

$$
\begin{align}
h'' = m^2h = 0 \colon h_1(\lambda) = cos(m\lambda) && h_2(\lambda) = sin(m\lambda)
\end{align}
$$

You can guess that the ``ODE`` for the $\theta$ part is somewhat difficult. [^5] It's called the ``characterstic differential equation for the associated Legendre function`` (pretty long name!).

$$
\begin{align}
g'' &= cot(\theta)g' + \left(l(l+1) - \frac{m^2}{sin^(\theta)}\right)g = 0 &&\text{dividing by } sin^2\theta\\ 
    g_1(\theta) &= P_{lm}(cos\theta) \qquad \colon \qquad g_2(\theta) = Q_{lm}(cos(\theta)
\end{align}
$$

The function $P_{lm}(cos\theta)$ is called ``associated Legendre`` of the $1^{st}$ kind, the function $Q_{lm}(cos\theta)$ is the $2^{nd}$ kind.

$$
 \begin{Bmatrix}
r^{-(l+1)}\\
r^l\\
 \end{Bmatrix}
 p_{lm}(\cos(\theta)) = 
 \begin{Bmatrix}
 \cos(m\lambda)\\
 \sin(m\lambda)
 \end{Bmatrix}
$$ 

These are called _solid spherical harmonics_. Harmonics because they solve Laplace's equation; spherical because they're in spherical coordinates; and solid because they're 3D functions, spanning the whole outer space. You can guess that we could get the surface spherical harmonics if we leave out the radial part.

$$
Y_{lm}(\theta, \lambda) = 
P_{lm}(cos\theta)
\begin{Bmatrix)
cos m\lambda\\
sin m\lambda
\end{Bmatrix}
$$

To get the full solution, we just have to combine all possible solutions, which lead us to $\eqref{eqn:spherical_harmonics}$

$$
\begin{equation}\label{spherical_harmonics}
\Phi(r, \theta, \lambda) = \sum_{l=0}^{\infty}\sum_{m=0}^{l} P_{lm}(cos \theta)(a_{lm}cos m \lambda + b_{lm}sin m\lambda)r^{-(l+1)} + P_{lm}(cos \theta)(c_{lm}cos m\lambda + d_{lm}sin m\lambda) r^l
\end{equation}
$$

where:
    * l is the degree
    * m is the order
    * $P_{lm}$ is associated Legender function of the $1^{st}$ kind also known as ALFs

<!--Attach the comparsion here, page 78 LNedrm -->

## Solution of Dirichlet ``BVP`` in $r, \theta, \lambda$

<!-- An Introduction to the reason why we solved Laplace's equation -->
Having solved the Laplace equation, it's very easy to solve the $1^{st} & 2^{nd}$ ``BVP``. In both cases the regularity condition $\eqref{eqn:regularity}$ demands that the term with the amplifying radial continuation $r^l$ disappears. Which result in $c_{lm} = d_{lm} = 0$ for all $l, m$ combinations (i.e., the second term of $\eqref{eqn:spherical_harmonics}$ becomes 0). 

$$
\begin{equation}\label{eqn:spherical_vanished}
\Phi(r, \theta, \lambda) = 
\sum_{l=0}^{\infty}\sum_{m=0}^{l} P_{lm}(cos \theta)(a_{lm}cos m\lambda + b_{lm}sin m\lambda)r^{-(l+1)}
\end{equation}
$$

The next step is in solving this ``BVP`` in Dirichlet, is to recognize that it's boundary is in $r = R$, which yileds

$$
\begin{equation}\label{eqn:spherical_R}
\Phi(R, \theta, \lambda) = \sum_{l=0}^{\infty}\sum_{m=0}^{l} P_{lm}(cos\theta)(a_{lm}cos m\lambda + b_{lm}sin m\lambda) R^l
\end{equation}
$$ 

Now we develop our actual boundary function into surface spherical harmonics:

$$
\begin{equation}
\Phi(R, \theta, \lambda) = \sum_{l=0}^{\infty}\sum_{m=0}^{l} P_{lm}(cos \theta)(u_{lm}cos m\lambda + v_{lm}sin m\lambda)
\end{equation}
$$ 

in which $v_{lm}$ and $u_{lm}$ are known coefficients now. The solution comes from a simple comparsion between these two series:

$$
u_{lm} = a_{lm} R^{-(l+1)} \qquad v_{lm} = b_{lm} R^{-(l+1)}
$$

Solving for $a$ and $b$ and inserting these coefficients back to $\eqref{eqn:spherical_harmonics}$ yields:

$$
\begin{equation}\label{eqn:spherical_last}
\Phi(R, \theta, \lambda) = \sum_{l=0}^{\infty}\sum_{m=0}^{l} P_{lm}(cos\theta)(u_{lm}cos m\lambda + v_{lm}sin m\lambda)\left(\frac{R}{r}\right)^{l+1}
\end{equation}
$$

This equation says if we know the function $\Phi$ on the boundary, we immediately know it everywhere in outer space [^1]. 

Well, we've done here, at least in developing the spherical harmonics equation. But that doesn't seem quite familiar to those equations in geodesy textbooks. First, there is $n$ instead of $l$, and it's a potential, hence $V$ instead of $\Phi$, the last thing, what about $\frac{GM}{R}$ term? Where it's gone? Not to forget that there was $C_{nm}$ and $S_{nm}$ as spherical harmonics coefficients. Let's rewrite the previous equation $\eqref{eqn:spherical_last}$ to be more ``physical geodesy friendly``.

$$
\begin{equation}\label{eqn:spherical_harmonics_end}
\V(r, \theta, \lambda) = \frac{GM}{R}\sum_{n=0}^{\infty}\left(\frac{R}{r}\right)^{n + 1}\sum_{m=0}^{n} P_{nm}(cos\theta)(C_{nm}cos m \lambda + S_{nm}sin m \lambda)
\end{equation}
$$

So far so good, we've solved Laplace's equation, and then we solved the ``BVP``, we've also fixed some notations to be consistent with what you'll see in geodesy literatures[^6]. That might be trivial thing to do (not for me at least, I always get confused when I see an equation in different notations.) 

Another interesting part is the types of the spherical harmonics, for now you should know that $n$ and $m$ are integers, and perhaps $m$ is in range of $[0 \to 1]$. There are three scenarios for our $n$ and $m$.
- $m = 0$: __zonal spherical harmonics__, because when $m = 0$ the sine-part vanishes. The name ``zonal`` comes from the fact that with $P_{n0}$ we'll get ${n+1}$ latitude bands called zones.
- $n = m$: __sectorial spherical harmonics__, the earth is divided into longitude bands called ``sectors``.
- 
Proceed to the next post to see how we can use this knowledge in geoid determination.

### Where I can find them in real life?


### Are they that important?


[^1]: Wikipedia [link](en.wikipedia.org/wiki/bounday_value_problem)
[^2]: Physical Geodesy Hoffmann, 
[^3]: There is another way to solve it. See Physical Geodesy Hoffmann et, al.
[^4]: Lne
[^5]: The preceding reference
[^6]: In Physical Geodesy, Hoffman et, al. the degree and order are denoted by n & m.