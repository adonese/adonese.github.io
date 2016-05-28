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
\begin{equation}\tag{1.1}\label{regularity}
\lim_{r \to \infty} \Phi (r) = 0
\end{equation}
$$

## Solving Laplace's equation

### Solving Laplace's equation in Cartesian coordinates

Let's consider the case of planar surface where x and y are the horizontal coordinates, z is the vertical coordinates. In this case we want to solve $f(x, y, z) = 0$ where z > 0.
A very important step in the solution is the separation of variables. For that let's rewrite the previous equation as follows

$$
\begin{equation}\label{laplace}\tag{laplace}
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

$$f''gh + fg''h + fgh'' = 0$$

Dividing the equation by ``1 / fgh``

$$\frac{f''}{f} + \frac{g''}{g} + \frac{h''}{h}$$

And now for something completely different...

The separation of variables leads to a separation of the partial derivatives equations into three ordinary differential equations ``(ODEs)``.

$$\frac{f''}{f} = -n^2, f'' + n^2f = 0$$

$$\frac{g''}{g} = -m^2, g'' + m^2g = 0$$

$$\frac{h''}{h}, n^2 + m^2, h'' - (n^2 + m^2)h = 0$$

The solution of these ``ODEs`` is elementary since they're $2^{nd}$ order ``ODE``.

$$f_1(x) = cos(nx),  f_2(x) = sin(nx)$$

$$g_1(y) = cos(my), g_2(y) = sin(my)$$

$$h_1(z) = e^{\sqrt{n^2 + m^2z}}, h_2(z) = e^{\sqrt{n^2 + m^2z}}$$

The general solution $\Phi(x, y, z)$ will be the product of $f, g$, and $h$. However for each n, and m we get a new solution. So, we have to count for all possible solutions for all combinations of m, n.
$$
\begin{equation}\label{eqn_2}
\Phi(x, y, z) = \sum_{n=0}^{\infty}\sum_{m=0}^{\infty} \left(
    a_{nm} cos(nx) cos(my) + b_{nm} cos(nx) sin(my)\\+
    c_{nm} sin(nx) cos(my) + \\d_{nm} sin(nx) sin(my) ) e^{-\sqrt{n^2 + m^2z}}+
    (e_{nm} cos(nx) cos(my) \\+ f_{nm} cos(nx) sin(my)+
    g_{nm} sin(nx) cos(my) \\+ h_{nm} sin(nx) sin(my))e^{\sqrt{n^2 + m^2z}} \right)
\end{equation}\tag{2}
$$
The solution of the Laplace's equation is not a solution of the ``BVP``. It only gives us the behaviour of the potential $\Phi$ in terms of base functions.
For the horizontal domain the base functions are sines and cosines. Thus the potential is a Fourier series in the horizontal domain. The $n$ and $m$ are the wave numbers; the higher they are, the shorter the wavelengths.
The vertical base functions are called _upward continutation_, since they describe the vertical behaviour. They either have a damping (with the minus sign), or amplifying effect. This effect apparently depends on $n$ and $m$. The higher $\sqrt{n^2 + m^2}$ the shorter the wavelength, the stronger the damping or amplifying effect. Thus the upward continutation either works as low-pass filter (minus sign), or as a high-pass filter.

### Solution of Dirichlet and Neumann BVPs in $x y z$
**Dirichlet** Given:

- the general solution in $\eqref{eqn_2}$
- the regularity condition
- the potential on the boundary ``z = 0``: $\Phi (x, y, z)$
solve for $\Phi$. The regularity condition demands already that we discard all contributions with the amplifying upward continuation. So half of the previous equation $\eqref{eqn_2}$ is used.
Next, we suppose that the boundary function is developed into a 2D Fourier series:

$$
\begin{equation}\tag{5}\label{fourier}
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

### Where I can find them in real life?

### Are they that important?


[^1]: Wikipedia [link](en.wikipedia.org/wiki/bounday_value_problem)
[^2]: Physical Geodesy Hoffmann, 
[^3]: There is another way to solve it. See Physical geodesy Hoffmann.