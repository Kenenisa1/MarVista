import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../Store/product';
import toast from 'react-hot-toast';
import { styles } from '../styles';
import { LogIn, Loader2, Eye, EyeOff } from 'lucide-react';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const { signin } = useUserStore();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const result = await signin(formData);
            
            if (result.success) {
                toast.success('Welcome back!');
                navigate('/');
            } else {
                toast.error(result.message || 'Sign in failed');
            }
        } catch (error) {
            console.error("Signin error:", error);
            toast.error('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = () => {
        setFormData({
            email: 'demo@example.com',
            password: 'demopassword'
        });
    };

    return (
        <div className={`min-h-screen ${styles.bgGradientPrimary} ${styles.flexCenter} p-4 sm:p-6 lg:p-8`}>
            <div className={`${styles.containerNarrow}`}>
                <div className={`${styles.flexCenter}`}>
                    <div className={`${styles.formContainer} ${styles.cardElevated} w-full`}>
                        
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className={`${styles.flexCenter} w-16 h-16 ${styles.roundedFull} bg-linear-to-r from-indigo-100 to-purple-100 mx-auto mb-4`}>
                                <LogIn className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h1 className={styles.h2}>
                                Welcome Back
                            </h1>
                            <p className={`${styles.subtitle} mt-2`}>
                                Sign in to access your account
                            </p>
                        </div>

                        {/* Demo Login Button */}
                        <button
                            onClick={handleDemoLogin}
                            className={`${styles.secondaryButton} w-full mb-6`}
                        >
                            Try Demo Account
                        </button>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* Email Field */}
                            <div>
                                <label className={styles.inputLabel}>
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                                    placeholder="you@example.com"
                                    disabled={loading}
                                />
                                {errors.email && (
                                    <p className={styles.inputErrorText}>{errors.email}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className={styles.inputLabel}>
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`${styles.input} ${errors.password ? styles.inputError : ''} pr-10`}
                                        placeholder="••••••••"
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                                        disabled={loading}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className={styles.inputErrorText}>{errors.password}</p>
                                )}
                                <p className={styles.inputHelper}>
                                    Must be at least 6 characters
                                </p>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className={`${styles.flexBetween}`}>
                                <div className="flex items-center">
                                    <input
                                        id="remember"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-2 focus:ring-indigo-500 border-gray-300 rounded"
                                        disabled={loading}
                                    />
                                    <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                        Remember me
                                    </label>
                                </div>
                                
                                <button
                                    type="button"
                                    onClick={() => navigate('/forgot-password')}
                                    className={`text-sm ${styles.primaryLink}`}
                                    disabled={loading}
                                >
                                    Forgot password?
                                </button>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`${styles.primaryButton} w-full`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                        Signing In...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="w-5 h-5 mr-2" />
                                        Sign In
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            {/* Sign Up Link */}
                            <div className="text-center">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => navigate('/signup')}
                                        className={styles.primaryLink}
                                        disabled={loading}
                                    >
                                        Sign up here
                                    </button>
                                </p>
                            </div>

                        </form>

                        {/* Terms */}
                        <div className="text-center pt-6 mt-6 border-t border-gray-200">
                            <p className={styles.small}>
                                By signing in, you agree to our{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate('/terms')}
                                    className={styles.primaryLink}
                                >
                                    Terms of Service
                                </button>{' '}
                                and{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate('/privacy')}
                                    className={styles.primaryLink}
                                >
                                    Privacy Policy
                                </button>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;