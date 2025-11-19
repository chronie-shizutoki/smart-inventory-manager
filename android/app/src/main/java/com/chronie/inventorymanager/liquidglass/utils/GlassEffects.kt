package com.chronie.inventorymanager.liquidglass.utils

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.selection.TextSelectionColors
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.*
import androidx.compose.ui.graphics.*
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.chronie.inventorymanager.ui.theme.getGlassColors

/** 液态玻璃效果工具类 提供各种液态玻璃视觉效果和工具函数 */

/** 创建液态玻璃背景效果 */
@Composable
fun GlassBackground(modifier: Modifier = Modifier, content: @Composable BoxScope.() -> Unit) {
    val glassColors = getGlassColors(MaterialTheme.colorScheme.background == Color.White)

    Box(
            modifier =
                    modifier.fillMaxSize()
                            .background(
                                    brush =
                                            Brush.verticalGradient(
                                                    colors =
                                                            listOf(
                                                                    glassColors.primary.copy(
                                                                            alpha = 0.1f
                                                                    ),
                                                                    glassColors.secondary.copy(
                                                                            alpha = 0.05f
                                                                    )
                                                            )
                                            )
                            ),
            contentAlignment = Alignment.Center,
            content = content
    )
}

/** 液态玻璃容器组件 */
@Composable
fun GlassContainer(
        modifier: Modifier = Modifier,
        cornerRadius: Dp = 16.dp,
        backgroundAlpha: Float = 0.4f,
        borderAlpha: Float = 0.3f,
        elevation: Dp = 8.dp,
        content: @Composable BoxScope.() -> Unit
) {
    val glassColors = getGlassColors(MaterialTheme.colorScheme.background == Color.White)

    Box(
            modifier =
                    modifier.clip(RoundedCornerShape(cornerRadius))
                            .background(
                                    brush =
                                            Brush.linearGradient(
                                                    colors =
                                                            listOf(
                                                                    glassColors.cardContainer.copy(
                                                                            alpha = backgroundAlpha
                                                                    ),
                                                                    glassColors.container.copy(
                                                                            alpha =
                                                                                    backgroundAlpha *
                                                                                            0.7f
                                                                    )
                                                            )
                                            )
                            )
                            .border(
                                    width = 1.dp,
                                    brush =
                                            Brush.linearGradient(
                                                    colors =
                                                            listOf(
                                                                    glassColors.border.copy(
                                                                            alpha = borderAlpha
                                                                    ),
                                                                    Color.Transparent
                                                            )
                                            ),
                                    shape = RoundedCornerShape(cornerRadius)
                            )
                            .shadow(
                                    elevation = elevation,
                                    spotColor = glassColors.primary.copy(alpha = 0.1f),
                                    ambientColor = glassColors.primary.copy(alpha = 0.05f)
                            )
                            .blur(20.dp),
            contentAlignment = Alignment.Center,
            content = content
    )
}

/** 液态玻璃卡片组件 */
@Composable
fun GlassCard(
        modifier: Modifier = Modifier,
        cornerRadius: Dp = 12.dp,
        backgroundAlpha: Float = 0.6f,
        selected: Boolean = false,
        onClick: (() -> Unit)? = null,
        content: @Composable ColumnScope.() -> Unit
) {
    val glassColors = getGlassColors(MaterialTheme.colorScheme.background == Color.White)
    val containerColor =
            if (selected) {
                glassColors.selectedContainer.copy(alpha = backgroundAlpha)
            } else {
                glassColors.cardContainer.copy(alpha = backgroundAlpha)
            }

    val borderColor =
            if (selected) {
                glassColors.selectedBorder
            } else {
                glassColors.border
            }

    Box(
            modifier =
                    modifier.then(
                                    if (onClick != null) {
                                        Modifier.clickable { onClick() }
                                    } else {
                                        Modifier
                                    }
                            )
                            .clip(RoundedCornerShape(cornerRadius))
                            .background(containerColor)
                            .border(
                                    width = 1.dp,
                                    brush =
                                            Brush.linearGradient(
                                                    colors =
                                                            listOf(
                                                                    borderColor.copy(
                                                                            alpha =
                                                                                    if (selected)
                                                                                            0.8f
                                                                                    else 0.3f
                                                                    ),
                                                                    Color.Transparent
                                                            )
                                            ),
                                    shape = RoundedCornerShape(cornerRadius)
                            )
                            .padding(16.dp)
    ) {
        androidx.compose.foundation.layout.Column(
                modifier = Modifier.fillMaxWidth(),
                content = content
        )
    }
}

/** 创建液态玻璃按钮效果 */
@Composable
fun GlassButton(
        modifier: Modifier = Modifier,
        text: String,
        icon: ImageVector? = null,
        onClick: () -> Unit,
        enabled: Boolean = true
) {
    val glassColors = getGlassColors(MaterialTheme.colorScheme.background == Color.White)
    val buttonColor =
            if (enabled) {
                glassColors.primary.copy(alpha = 0.8f)
            } else {
                glassColors.textSecondary.copy(alpha = 0.3f)
            }

    androidx.compose.material3.Button(
            onClick = onClick,
            modifier =
                    modifier.clip(RoundedCornerShape(24.dp))
                            .background(
                                    brush =
                                            Brush.linearGradient(
                                                    colors =
                                                            listOf(
                                                                    buttonColor,
                                                                    buttonColor.copy(alpha = 0.7f)
                                                            )
                                            )
                            )
                            .border(
                                    width = 1.dp,
                                    color = glassColors.primary.copy(alpha = 0.5f),
                                    shape = RoundedCornerShape(24.dp)
                            ),
            enabled = enabled,
            colors =
                    androidx.compose.material3.ButtonDefaults.buttonColors(
                            containerColor = Color.Transparent,
                            contentColor = glassColors.text
                    )
    ) {
        if (icon != null) {
            Icon(
                    imageVector = icon,
                    contentDescription = null,
                    modifier = Modifier.size(20.dp)
            )
            Spacer(modifier = Modifier.width(8.dp))
        }
        androidx.compose.material3.Text(text)
    }
}

/** 液态玻璃输入框效果 */
@Composable
fun GlassTextField(
        value: String,
        onValueChange: (String) -> Unit,
        modifier: Modifier = Modifier,
        placeholder: String = "",
        singleLine: Boolean = true
) {
    val glassColors = getGlassColors(MaterialTheme.colorScheme.background == Color.White)

    androidx.compose.material3.OutlinedTextField(
            value = value,
            onValueChange = onValueChange,
            modifier =
                    modifier.clip(RoundedCornerShape(16.dp))
                            .background(glassColors.cardContainer.copy(alpha = 0.4f))
                            .border(
                                    width = 1.dp,
                                    brush =
                                            Brush.linearGradient(
                                                    colors =
                                                            listOf(
                                                                    glassColors.border.copy(
                                                                            alpha = 0.5f
                                                                    ),
                                                                    Color.Transparent
                                                            )
                                            ),
                                    shape = RoundedCornerShape(16.dp)
                            ),
            placeholder = {
                androidx.compose.material3.Text(
                        text = placeholder,
                        color = glassColors.textSecondary.copy(alpha = 0.7f)
                )
            },
            colors =
                    androidx.compose.material3.OutlinedTextFieldDefaults.colors(
                            focusedTextColor = glassColors.text,
                            unfocusedTextColor = glassColors.text,
                            focusedBorderColor = Color.Transparent,
                            unfocusedBorderColor = Color.Transparent,
                            focusedContainerColor = Color.Transparent,
                            unfocusedContainerColor = Color.Transparent,
                            cursorColor = glassColors.primary,
                            selectionColors =
                                    TextSelectionColors(
                                            handleColor = glassColors.primary,
                                            backgroundColor = glassColors.primary.copy(alpha = 0.2f)
                                    )
                    ),
            singleLine = singleLine
    )
}

/** 液态玻璃状态指示器 */
@Composable
fun GlassStatusIndicator(status: String, type: StatusType, modifier: Modifier = Modifier) {
    val glassColors = getGlassColors(MaterialTheme.colorScheme.background == Color.White)
    val (color, icon) =
            when (type) {
                StatusType.SUCCESS -> glassColors.success to "✓"
                StatusType.WARNING -> glassColors.warning to "!"
                StatusType.ERROR -> glassColors.error to "✕"
                StatusType.INFO -> glassColors.info to "i"
            }

    Box(
            modifier =
                    modifier.clip(RoundedCornerShape(12.dp))
                            .background(color.copy(alpha = 0.2f))
                            .border(
                                    width = 1.dp,
                                    color = color.copy(alpha = 0.5f),
                                    shape = RoundedCornerShape(12.dp)
                            )
                            .padding(horizontal = 12.dp, vertical = 6.dp)
    ) {
        Row(verticalAlignment = androidx.compose.ui.Alignment.CenterVertically) {
            androidx.compose.material3.Text(
                    text = icon,
                    color = color,
                    fontWeight = androidx.compose.ui.text.font.FontWeight.Bold,
                    fontSize =
                            androidx.compose.material3.MaterialTheme.typography.labelSmall.fontSize
            )
            Spacer(modifier = Modifier.width(4.dp))
            androidx.compose.material3.Text(
                    text = status,
                    color = color,
                    fontSize =
                            androidx.compose.material3.MaterialTheme.typography.labelSmall.fontSize
            )
        }
    }
}

/** 状态类型枚举 */
enum class StatusType {
    SUCCESS,
    WARNING,
    ERROR,
    INFO
}

/** 液态玻璃悬停效果 */
fun Modifier.glassHoverEffect(isHovered: Boolean, hoverColor: Color = Color.White): Modifier {
    return this.then(
            if (isHovered) {
                Modifier.background(hoverColor.copy(alpha = 0.1f))
                        .shadow(elevation = 8.dp, spotColor = hoverColor.copy(alpha = 0.2f))
            } else {
                Modifier
            }
    )
}

/** 液态玻璃加载动画背景 */
@Composable
fun GlassShimmer(modifier: Modifier = Modifier, isLoading: Boolean = true) {
    if (isLoading) {
        val glassColors = getGlassColors(MaterialTheme.colorScheme.background == Color.White)

        Box(
                modifier =
                        modifier.clip(RoundedCornerShape(8.dp))
                                .background(
                                        brush =
                                                Brush.linearGradient(
                                                        colors =
                                                                listOf(
                                                                        glassColors.cardContainer
                                                                                .copy(alpha = 0.3f),
                                                                        glassColors.cardContainer
                                                                                .copy(alpha = 0.1f),
                                                                        glassColors.cardContainer
                                                                                .copy(alpha = 0.3f)
                                                                )
                                                )
                                )
        )
    }
}
