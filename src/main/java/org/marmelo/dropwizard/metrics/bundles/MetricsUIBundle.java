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
package org.marmelo.dropwizard.metrics.bundles;

import io.dropwizard.Bundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import org.marmelo.dropwizard.metrics.servlets.MetricsUIServlet;

/**
 * Dropwizard Metrics UI Bundle.
 *
 * @author Rafael Marmelo
 * @since 1.0
 */
public class MetricsUIBundle implements Bundle {

    /**
     * The servlet mapping.
     */
    private final String mapping;

    /**
     * Creates a new Metrics UI Bundle.
     *
     * The UI will be deployed by default at "/admin" path.
     */
    public MetricsUIBundle() {
        this("/admin/*");
    }
    /**
     * Creates a new Metrics UI Bundle.
     *
     * @param mapping the path where to deploy the UI ("/admin/*" by default).
     */
    public MetricsUIBundle(final String mapping) {
        this.mapping = mapping;
    }

    @Override
    public void initialize(final Bootstrap<?> bootstrap) {
        // empty
    }

    @Override
    public void run(final Environment environment) {
        environment.admin()
                .addServlet("Dropwizard Metrics UI", new MetricsUIServlet())
                .addMapping(this.mapping);
    }
}
