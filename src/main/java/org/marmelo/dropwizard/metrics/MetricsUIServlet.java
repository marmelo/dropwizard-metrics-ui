/*
 * MIT License (MIT)
 *
 * Copyright (c) 2018 Rafael Marmelo
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package org.marmelo.dropwizard.metrics;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Dropwizard Metrics UI Servlet.
 *
 * @author Rafael Marmelo
 * @since 1.0
 */
public class MetricsUIServlet extends HttpServlet {

    @Override
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws ServletException, IOException {
        response.setStatus(HttpServletResponse.SC_OK);

        final String basedir = "/org/marmelo/dropwizard/metrics/";
        final String path = request.getPathInfo();
        final String resource;

        if (path == null || path.isEmpty()) {
            // send trailing slash redirect
            response.sendRedirect(request.getRequestURL()
                    .append("/")
                    .toString());
            return;
        } else if (path.equals("/") || path.equals("/index.html")) {
            // serve html
            resource = "index.html";
            response.setContentType("text/html");
        } else if (path.equals("/bundle.js")) {
            // serve javascript
            resource = "bundle.js";
            response.setContentType("application/javascript");
        } else {
            // send 404 not found error
            response.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        try (PrintWriter writer = response.getWriter()) {
            final InputStream in = this.getClass().getResourceAsStream(basedir + resource);
            final BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            reader.lines().forEach(writer::println);
        }
    }
}
