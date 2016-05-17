---
layout:     post
title:      Spherical harmonics
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

$$\omega = 0$$

A very good question arise, why do we care about solving Laplace's equation?
The answer for this question is even trickier! We need to solve Laplace's equation as a step for solving boundary values problems ``BVPs``. Before you ask, we need to solve BVPs because, in our case, earth is a good example of a boundary problem (It's bounded by latitudes and longitudes). 

## Solving Laplace's equation

### Solving Laplace's equation in Cartesian coordinates

Let's consider the case of planar surface where x and y are the horizontal coordinates, z is the vertical coordinates. In this case we want to solve $f(x, y, z) = 0$ where z > 0.
A very important step in the solution is the separation of variables. For that let's rewrite the previous equation as follows

$$\begin{equation}
\nabla (x, y, z) = \nabla f(x) g(y) h(z) = 0
\end{equation}$$

applying the chain rule will give us the following.

$$\begin{equation}
\frac {\partial ^ 2 f(x)} {\partial x ^ 2} g(y) h(z) + f(x) \frac{\partial ^ 2 g(y)} {\partial y ^ 2} h(z) + f(x) g(y) \frac{\partial ^ 2 h(z)}{\partial z ^ 2} = 0
\end{equation}$$

The first summand on the equation only depends on x, the g-part depends on y, the h-part depends on z.

We can modify the previous equation as follows

$$f''gh + fg''h + fgh'' = 0$$

Dividing the equation by ``$1 / fgh$``

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

The general solution $\omega(x, y, z)$ will be the product of $f, g, and h$. However for each n, and m we get a new solution. So, we have to count for all possible solutions for all combinations of m, n.

$$
\omega(x, y, z) = \sum_{n=0}^{\inf}\sum_{m=0}^{\inf} (
    a_{nm} cos(nx) cos(my) + b_{nm} cos(nx) sin(my) + 
    c_{nm} sin(nx) cos(my) + d_{nm} sin(nx) sin(my) ) e^{-\sqrt{n^2 + m^2z}} +
    (e_{nm} cos(nx) cos(my) + f_{nm} cos(nx) sin(my) +
    g_{nm} sin(nx) cos(my) + h_{nm} sin(nx) sin(my))e^{\sqrt{n^2 + m^2z}}
)
$$

The solution of the Laplace's equation is not a solution of the ``BVP``. It only gives us the behaviour of the potential $\omega$ in terms of base functions.
For the horizontal domain the base functions are sines and cosines. Thus the potential is a Fourier series in the horizontal domain. The $n$ and $m$ are the wave numbers; the higher they are, the shorter the wavelengths.
The vertical base functions are called _upward continutation_, since they describe the vertical behaviour. They either have a damping (with the minus sign), or amplifying effect. This effect apparently depends on $n$ and $m$. The higher $\sqrt{n^2 + m^2}$ the shorter the wavelength, the stronger the damping or amplifying effect. Thus the upward contiutation either works as low-pass filter (minus sign), or as a high-pass filter.


### Where I can find them in real life?

### Are they that important?
